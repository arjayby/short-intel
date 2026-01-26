import { relations } from "drizzle-orm";
import {
	boolean,
	decimal,
	index,
	integer,
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

/* =========================
   CHANNELS (CURRENT STATE)
========================= */
export const channels = pgTable(
	"channels",
	{
		id: serial("id").primaryKey(),

		// External identifier
		youtubeChannelId: varchar("youtube_channel_id", { length: 255 })
			.notNull()
			.unique(),

		channelName: varchar("channel_name", { length: 255 }).notNull(),
		description: text("description"),
		thumbnailUrl: varchar("thumbnail_url", { length: 1024 }),

		// Latest fetched values (cache)
		subscriberCount: integer("subscriber_count").notNull().default(0),
		videoCount: integer("video_count").notNull().default(0),
		viewCount: integer("view_count").notNull().default(0),

		// Shorts analytics (cached / derived)
		shortsCount: integer("shorts_count").notNull().default(0),
		shortsAverageViews: decimal("shorts_average_views", {
			precision: 15,
			scale: 2,
		}).default("0"),
		shortsMaxViews: integer("shorts_max_views").default(0),

		// Derived growth metrics (cached)
		growthRate7d: decimal("growth_rate_7d", { precision: 6, scale: 2 }).default(
			"0",
		),
		growthRate30d: decimal("growth_rate_30d", {
			precision: 6,
			scale: 2,
		}).default("0"),
		engagementRate: decimal("engagement_rate", {
			precision: 5,
			scale: 2,
		}).default("0"),

		niche: varchar("niche", { length: 100 }),

		isShortsFocused: boolean("is_shorts_focused").default(false),
		isVerified: boolean("is_verified").default(false),
		isMonetized: boolean("is_monetized").default(false),

		aiSummary: text("ai_summary"),

		// Fetch control
		lastFetchedAt: timestamp("last_fetched_at"),
		fetchPriority: integer("fetch_priority").default(0),
		isActive: boolean("is_active").default(true),

		metadata: jsonb("metadata"),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("idx_channels_niche").on(table.niche),
		index("idx_channels_subs").on(table.subscriberCount),
		index("idx_channels_growth7d").on(table.growthRate7d),
		index("idx_channels_fetch_priority").on(table.fetchPriority),
	],
);

/* =========================
   CHANNEL SNAPSHOTS
========================= */
export const channelSnapshots = pgTable(
	"channel_snapshots",
	{
		id: serial("id").primaryKey(),

		channelId: integer("channel_id")
			.notNull()
			.references(() => channels.id, { onDelete: "cascade" }),

		subscriberCount: integer("subscriber_count").notNull(),
		viewCount: integer("view_count").notNull(),
		videoCount: integer("video_count").notNull(),

		capturedAt: timestamp("captured_at").defaultNow().notNull(),
	},
	(table) => [
		index("idx_channel_snapshots_channel").on(table.channelId),
		index("idx_channel_snapshots_time").on(table.capturedAt),
	],
);

/* =========================
   SHORTS (CURRENT STATE)
========================= */
export const shorts = pgTable(
	"shorts",
	{
		id: serial("id").primaryKey(),

		youtubeShortId: varchar("youtube_short_id", { length: 255 })
			.notNull()
			.unique(),

		channelId: integer("channel_id")
			.notNull()
			.references(() => channels.id, { onDelete: "cascade" }),

		title: varchar("title", { length: 500 }).notNull(),
		description: text("description"),
		thumbnailUrl: varchar("thumbnail_url", { length: 1024 }),

		durationSeconds: integer("duration_seconds").notNull(),
		publishedAt: timestamp("published_at").notNull(),

		// Latest cached stats
		viewCount: integer("view_count").notNull().default(0),
		likeCount: integer("like_count").notNull().default(0),
		commentCount: integer("comment_count").notNull().default(0),

		// Derived metrics (cached)
		views24h: integer("views_24h").default(0),
		velocity24h: decimal("velocity_24h", { precision: 10, scale: 2 }).default(
			"0",
		),
		viewsToSubRatio: decimal("views_to_sub_ratio", {
			precision: 10,
			scale: 2,
		}).default("0"),

		isViral: boolean("is_viral").default(false),

		lastFetchedAt: timestamp("last_fetched_at"),
		fetchPriority: integer("fetch_priority").default(0),
		isActive: boolean("is_active").default(true),

		metadata: jsonb("metadata"),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("idx_shorts_channel").on(table.channelId),
		index("idx_shorts_velocity").on(table.velocity24h),
		index("idx_shorts_published").on(table.publishedAt),
		index("idx_shorts_is_viral").on(table.isViral),
	],
);

/* =========================
   SHORT SNAPSHOTS
========================= */
export const shortSnapshots = pgTable(
	"short_snapshots",
	{
		id: serial("id").primaryKey(),

		shortId: integer("short_id")
			.notNull()
			.references(() => shorts.id, { onDelete: "cascade" }),

		viewCount: integer("view_count").notNull(),
		likeCount: integer("like_count").notNull(),
		commentCount: integer("comment_count").notNull(),

		capturedAt: timestamp("captured_at").defaultNow().notNull(),
	},
	(table) => [
		index("idx_short_snapshots_short").on(table.shortId),
		index("idx_short_snapshots_time").on(table.capturedAt),
	],
);

/* =========================
   SAVED FOLDERS
========================= */
export const savedFolders = pgTable("saved_folders", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   SAVED CHANNELS
========================= */
export const savedChannels = pgTable(
	"saved_channels",
	{
		id: serial("id").primaryKey(),

		folderId: integer("folder_id")
			.notNull()
			.references(() => savedFolders.id, { onDelete: "cascade" }),

		channelId: integer("channel_id")
			.notNull()
			.references(() => channels.id, { onDelete: "cascade" }),

		notes: text("notes"),
		savedAt: timestamp("saved_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("idx_saved_channels_unique").on(
			table.folderId,
			table.channelId,
		),
	],
);

/* =========================
   ALERTS
========================= */
export const alerts = pgTable("alerts", {
	id: serial("id").primaryKey(),

	channelId: integer("channel_id")
		.notNull()
		.references(() => channels.id, { onDelete: "cascade" }),

	alertType: varchar("alert_type", { length: 100 }).notNull(),
	threshold: integer("threshold"),
	cooldownMinutes: integer("cooldown_minutes").default(60),

	isActive: boolean("is_active").default(true),
	lastTriggeredAt: timestamp("last_triggered_at"),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   ALERT HISTORY
========================= */
export const alertHistory = pgTable("alert_history", {
	id: serial("id").primaryKey(),

	alertId: integer("alert_id")
		.notNull()
		.references(() => alerts.id, { onDelete: "cascade" }),

	channelId: integer("channel_id")
		.notNull()
		.references(() => channels.id, { onDelete: "cascade" }),

	shortId: integer("short_id").references(() => shorts.id),

	message: text("message"),
	metadata: jsonb("metadata"),

	triggeredAt: timestamp("triggered_at").defaultNow().notNull(),
});

/* =========================
   RELATIONS
========================= */
export const channelsRelations = relations(channels, ({ many }) => ({
	shorts: many(shorts),
	snapshots: many(channelSnapshots),
	alerts: many(alerts),
	saved: many(savedChannels),
}));

export const shortsRelations = relations(shorts, ({ one, many }) => ({
	channel: one(channels, {
		fields: [shorts.channelId],
		references: [channels.id],
	}),
	snapshots: many(shortSnapshots),
}));

export const savedChannelsRelations = relations(savedChannels, ({ one }) => ({
	channel: one(channels, {
		fields: [savedChannels.channelId],
		references: [channels.id],
	}),
	folder: one(savedFolders, {
		fields: [savedChannels.folderId],
		references: [savedFolders.id],
	}),
}));
