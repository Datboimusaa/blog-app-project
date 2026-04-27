import { Redirect } from "expo-router";
 
// Fallback: immediately redirect away from "/"
// The real routing logic lives in _layout.jsx
export default function Index() {
  return <Redirect href="/login" />;
}
 