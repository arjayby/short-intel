import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/saved"!</div>
}
