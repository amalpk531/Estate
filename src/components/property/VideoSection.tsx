import { youtubeEmbed, type Video } from "@/lib/properties";

export function VideoSection({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Videos</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {videos.map((video) => {
          const embed = youtubeEmbed(video.url);
          return (
            <figure key={video.url + video.title} className="space-y-2">
              <div className="aspect-video overflow-hidden rounded-xl border border-border bg-muted">
                {embed ? (
                  <iframe
                    src={embed}
                    title={video.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  // Muted + no autoplay: playback starts only on user action.
                  <video
                    src={video.url}
                    poster={video.thumbnail}
                    controls
                    preload="none"
                    playsInline
                    className="size-full object-cover"
                  />
                )}
              </div>
              <figcaption className="text-sm text-muted-foreground">
                {video.title} · <span className="capitalize">{video.type}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
