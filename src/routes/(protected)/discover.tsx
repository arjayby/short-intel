import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/discover')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/discover"!</div>
}
