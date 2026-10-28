import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type ShotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

function inPublic(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

// Image from /public. Until the file exists, a tinted block shows the path to fill in,
// so the layout stays intact and it is clear which image is still missing.
export function Shot({ src, alt, width, height, sizes, className = "", priority, style }: ShotProps) {
  if (inPublic(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={className}
        style={style}
      />
    );
  }
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`shot-missing ${className}`}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
    >
      <span aria-hidden="true">
        Add image {width} × {height}
        <br />
        public{src}
      </span>
    </span>
  );
}
