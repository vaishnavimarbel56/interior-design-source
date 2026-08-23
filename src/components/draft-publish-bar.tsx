import { useSiteSettings, setPreviewDraft, publishDraft, discardDraft } from "@/lib/site-settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function DraftPublishBar() {
  const s = useSiteSettings();
  const [publishing, setPublishing] = useState(false);

  const onPublish = async () => {
    setPublishing(true);
    try {
      publishDraft("admin");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <Switch
            checked={s.previewDraft}
            onCheckedChange={(v) => setPreviewDraft(Boolean(v))}
            aria-label="Preview draft"
          />
          <span className="text-sm text-muted-foreground">Preview draft</span>
        </label>
        <span className="text-sm text-muted-foreground">{s.dirty ? "Unsaved changes" : "No pending changes"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => discardDraft("admin")} disabled={!s.dirty}>
          Discard
        </Button>
        <Button variant="secondary" size="sm" onClick={onPublish} disabled={!s.dirty || publishing}>
          Publish
        </Button>
      </div>
    </div>
  );
}
