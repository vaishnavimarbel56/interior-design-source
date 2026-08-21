import floorTiles from "@/assets/sub/floor-tiles.jpg";
import wallTiles from "@/assets/sub/wall-tiles.jpg";
import bathroomTiles from "@/assets/sub/bathroom-tiles.jpg";
import kitchenTiles from "@/assets/sub/kitchen-tiles.jpg";
import outdoorTiles from "@/assets/sub/outdoor-tiles.jpg";
import elevationTiles from "@/assets/sub/elevation-tiles.jpg";
import bathroomSanitaryware from "@/assets/sub/bathroom-sanitaryware.jpg";
import wallHungWc from "@/assets/sub/wall-hung-wc.jpg";
import onePieceWc from "@/assets/sub/one-piece-wc.jpg";
import washBasin from "@/assets/sub/wash-basin.jpg";
import counterBasin from "@/assets/sub/counter-basin.jpg";
import bathroomAccessories from "@/assets/sub/bathroom-accessories.jpg";
import kitchenSink from "@/assets/sub/kitchen-sink.jpg";
import stainlessSteelSink from "@/assets/sub/stainless-steel-sink.jpg";
import singleBowlSink from "@/assets/sub/single-bowl-sink.jpg";
import doubleBowlSink from "@/assets/sub/double-bowl-sink.jpg";
import designerKitchenSink from "@/assets/sub/designer-kitchen-sink.jpg";
import vanity from "@/assets/sub/vanity.jpg";
import bathroomVanityUnit from "@/assets/sub/bathroom-vanity-unit.jpg";
import wallMountedVanity from "@/assets/sub/wall-mounted-vanity.jpg";
import designerBathroomVanity from "@/assets/sub/designer-bathroom-vanity.jpg";
import washBasinVanity from "@/assets/sub/wash-basin-vanity.jpg";
import parkingFloorTiles from "@/assets/sub/parking-floor-tiles.jpg";
import heavyDutyParkingTiles from "@/assets/sub/heavy-duty-parking-tiles.jpg";
import outdoorParkingTiles from "@/assets/sub/outdoor-parking-tiles.jpg";
import antiSkidParkingTiles from "@/assets/sub/anti-skid-parking-tiles.jpg";
import carParkingTiles from "@/assets/sub/car-parking-tiles.jpg";
import marble from "@/assets/sub/marble.jpg";
import granite from "@/assets/sub/granite.jpg";

/** One unique photo per subcategory — no image is reused across subcategories. */
export const SUB_IMAGES: Record<string, string> = {
  "floor-tiles": floorTiles,
  "wall-tiles": wallTiles,
  "bathroom-tiles": bathroomTiles,
  "kitchen-tiles": kitchenTiles,
  "outdoor-tiles": outdoorTiles,
  "elevation-tiles": elevationTiles,
  "bathroom-sanitaryware": bathroomSanitaryware,
  "wall-hung-wc": wallHungWc,
  "one-piece-wc": onePieceWc,
  "wash-basin": washBasin,
  "counter-basin": counterBasin,
  "bathroom-accessories": bathroomAccessories,
  "kitchen-sink": kitchenSink,
  "stainless-steel-sink": stainlessSteelSink,
  "single-bowl-sink": singleBowlSink,
  "double-bowl-sink": doubleBowlSink,
  "designer-kitchen-sink": designerKitchenSink,
  vanity: vanity,
  "bathroom-vanity-unit": bathroomVanityUnit,
  "wall-mounted-vanity": wallMountedVanity,
  "designer-bathroom-vanity": designerBathroomVanity,
  "wash-basin-vanity": washBasinVanity,
  "parking-floor-tiles": parkingFloorTiles,
  "heavy-duty-parking-tiles": heavyDutyParkingTiles,
  "outdoor-parking-tiles": outdoorParkingTiles,
  "anti-skid-parking-tiles": antiSkidParkingTiles,
  "car-parking-tiles": carParkingTiles,
  marble: marble,
  granite: granite,
};

/* --- Uploaded photography (CDN assets) --- */
import radhaKrishna from "@/assets/sub/statues-radha-krishna.jpg.asset.json";
import sitaRama from "@/assets/sub/statues-sita-rama.jpg.asset.json";
import lakshmi from "@/assets/sub/statues-goddess-lakshmi.jpg.asset.json";
import maaKali from "@/assets/sub/statues-maa-kali.jpg.asset.json";
import saiBaba from "@/assets/sub/statues-sai-baba.jpg.asset.json";
import marbleMandir from "@/assets/sub/house-marble-mandir.jpg.asset.json";
import marbleFireplace from "@/assets/sub/house-marble-fireplace.jpg.asset.json";
import greenMarble from "@/assets/sub/marble-green.jpg.asset.json";
import greyMarble from "@/assets/sub/marble-grey.jpg.asset.json";

export const UPLOADED_IMAGES = {
  radhaKrishna: radhaKrishna.url,
  sitaRama: sitaRama.url,
  lakshmi: lakshmi.url,
  maaKali: maaKali.url,
  saiBaba: saiBaba.url,
  marbleMandir: marbleMandir.url,
  marbleFireplace: marbleFireplace.url,
  greenMarble: greenMarble.url,
  greyMarble: greyMarble.url,
};

Object.assign(SUB_IMAGES, {
  "radha-krishna-statue": UPLOADED_IMAGES.radhaKrishna,
  "sita-rama-statue": UPLOADED_IMAGES.sitaRama,
  "goddess-lakshmi-statue": UPLOADED_IMAGES.lakshmi,
  "maa-kali-statue": UPLOADED_IMAGES.maaKali,
  "sai-baba-statue": UPLOADED_IMAGES.saiBaba,
  "marble-mandir": UPLOADED_IMAGES.marbleMandir,
  "marble-fireplace": UPLOADED_IMAGES.marbleFireplace,
  "green-marble": UPLOADED_IMAGES.greenMarble,
  "grey-marble": UPLOADED_IMAGES.greyMarble,
});
