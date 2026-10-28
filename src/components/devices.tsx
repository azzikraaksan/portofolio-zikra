import { Shot } from "@/components/shot";

// Folder gambar perangkat tiap project: AlurKerja punya folder sendiri, project lain di projects/<slug>.
export const deviceDir = (slug: string) => (slug === "alurkerja" ? "/images/alurkerja" : `/images/projects/${slug}`);

// Laptop, tablet, dan handphone berjejer. Tinggi menyesuaikan layar supaya semuanya muat tanpa menggulir.
export function Devices({ slug, name }: { slug: string; name: string }) {
  const dir = deviceDir(slug);
  return (
    <div className="devices" role="group" aria-label={`${name} on laptop, tablet, and phone`}>
      <div className="dev dev-laptop">
        <div className="lid">
          <Shot src={`${dir}/laptop1.png`} alt={`${name} on a laptop`} width={1600} height={1000} sizes="(min-width: 1024px) 640px, 50vw" priority className="h-full w-full" style={{ aspectRatio: "auto" }} />
        </div>
        <div className="base" aria-hidden="true" />
      </div>
      <div className="dev dev-tablet">
        <Shot src={`${dir}/tablet1.png`} alt={`${name} on a tablet`} width={1200} height={1600} sizes="(min-width: 1024px) 380px, 30vw" priority className="h-full w-full" style={{ aspectRatio: "auto" }} />
      </div>
      <div className="dev dev-phone">
        <Shot src={`${dir}/phone.png`} alt={`${name} on a phone`} width={900} height={1900} sizes="(min-width: 1024px) 200px, 15vw" priority className="h-full w-full" style={{ aspectRatio: "auto" }} />
      </div>
    </div>
  );
}
