import { useEffect, useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Simple client-side admin gate. This app has no server/database, so the
 * password only hides the panel on this device — change it here when needed.
 */
const ADMIN_PASSWORD = "vaishnavi@2026";
const KEY = "vm-admin-unlocked";

export function AdminGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;

  if (unlocked) {
    return (
      <div>
        <div className="container-page pt-6 text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              sessionStorage.removeItem(KEY);
              setUnlocked(false);
            }}
          >
            Log out
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pw === ADMIN_PASSWORD) {
            sessionStorage.setItem(KEY, "1");
            setUnlocked(true);
          } else {
            setError(true);
          }
        }}
        className="w-full max-w-sm animate-scale-in rounded-xl border border-border bg-card p-8 shadow-card"
      >
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-primary">
          <Lock className="size-5" />
        </div>
        <h1 className="mt-4 text-center font-display text-2xl">Admin login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Enter the admin password to manage the catalog.
        </p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="admin-pw">Password</Label>
          <Input
            id="admin-pw"
            type="password"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
          />
          {error && <p className="text-sm text-destructive">Incorrect password.</p>}
        </div>
        <Button type="submit" className="mt-5 w-full">
          Unlock admin
        </Button>
      </form>
    </div>
  );
}
