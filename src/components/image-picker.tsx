import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";

type Area = { x: number; y: number; width: number; height: number };

async function getCroppedImg(imageSrc: string, pixelCrop: any, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve("");
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    }, "image/jpeg", 0.9);
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (e) => reject(e));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

export default function ImagePicker({
  onChange,
  initial,
}: {
  onChange: (dataUrl: string) => void;
  initial?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [src, setSrc] = useState<string | null>(initial ?? null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (initial) setSrc(initial);
  }, [initial]);

  const onFile = useCallback(async (file?: File) => {
    if (!file) return;
    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      alert("Only JPG images are accepted");
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);
    setEditing(true);
  }, []);

  const trigger = () => inputRef.current?.click();

  const onCropComplete = useCallback((_: Area, croppedAreaPixelsLocal: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsLocal);
  }, []);

  const onApply = useCallback(async () => {
    if (!src || !croppedAreaPixels) return;
    const dataUrl = await getCroppedImg(src, croppedAreaPixels);
    onChange(dataUrl);
    // cleanup blob url if we created one
    if (src && src.startsWith("blob:")) URL.revokeObjectURL(src);
    setEditing(false);
  }, [src, croppedAreaPixels, onChange]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg"
        onChange={(e) => onFile(e.target.files?.[0])}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <button type="button" onClick={trigger} className="rounded-md px-3 py-1 border">
          Choose JPG
        </button>
        {src && !editing && (
          <img src={src} alt="preview" className="w-24 h-24 object-contain rounded-sm border" />
        )}
      </div>

      {editing && src && (
        <div className="mt-4">
          <div className="relative h-72 w-full bg-black">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button type="button" onClick={() => setEditing(false)} className="px-3 py-1 border rounded-md">
              Cancel
            </button>
            <button type="button" onClick={onApply} className="px-3 py-1 bg-primary text-primary-foreground rounded-md">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
