import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/viral-shorts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/viral-shorts"!</div>
}
