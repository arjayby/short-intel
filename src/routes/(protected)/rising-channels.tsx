import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/rising-channels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/rising-channels"!</div>
}
