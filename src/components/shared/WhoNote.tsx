/** "Who you work with" note — a short, person-free reassurance card shown
 *  wherever a prospect decides whether to reach out. */
export function WhoNote({ note }: { note: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-6">
      <p className="max-w-md text-sm text-fg-muted">{note}</p>
    </div>
  );
}
