/** Oblik `sections[]` iz GROQ-a — deljeno između posta, stranice i MediaSection. */

export type SanityPortableTextSpan = {
  _type: string;
  _key: string;
  style?: string;
  children?: Array<{ text: string; _type: string; marks?: string[] }>;
};

export type SanityScrollScalePanel = {
  _key: string;
  title?: string;
  content?: SanityPortableTextSpan[];
  backgroundImage?: { asset: { url: string }; hotspot?: { x: number; y: number } };
  imageAlt?: string;
  textPlacement?: "left" | "right";
};

export type SanityMediaSection =
  | { _key: string; _type: "videoSection"; url: string; caption?: string }
  | {
      _key: string;
      _type: "gallerySection";
      images?: Array<{
        _key: string;
        src?: string | null;
        asset?: { url?: string } | null;
        alt?: string;
        caption?: string;
      }>;
    }
  | {
      _key: string;
      _type: "animationTextSection";
      content?: SanityPortableTextSpan[];
    }
  | {
      _key: string;
      _type: "fullWidthTextSection";
      backgroundImage?: { asset: { url: string }; hotspot?: { x: number; y: number } };
      text?: string;
    }
  | {
      _key: string;
      _type: "formSection";
      heading?: string;
      nameLabel?: string;
      emailLabel?: string;
      messageLabel?: string;
      submitLabel?: string;
      actionUrl?: string;
    }
  | {
      _key: string;
      _type: "scrollScaleSection";
      heading?: string;
      panels?: SanityScrollScalePanel[];
    };
