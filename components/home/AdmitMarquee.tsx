function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const row = [...Array(10).keys()];
  return (
    <div className="flex w-max shrink-0 gap-3" aria-hidden={ariaHidden || undefined}>
      {row.map((chip, i) => {
        return (
          <figure key={i} className={`admit-item lg:w-64 w-48 aspect-[0.8] overflow-hidden transition-opacity rounded-ui`}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/theprogress-9d205.firebasestorage.app/o/homeChat%2F1780083791119-17.png?alt=media&token=484f2209-d70c-4e91-8f22-9a32c2972120"
              alt=""
              className="w-full h-full object-contain"
            />
          </figure>
        );
      })}
    </div>
  );
}

export function AdmitMarquee() {
  return (
    <section aria-label="รายชื่อน้องสอบติด" className="relative pt-9 bg-linear-to-b from-blush to-tint-pink py-4">
      {/* container's own left gutter/centering, reproduced by hand so this row can start where .container would but still bleed its right edge to the true viewport edge. */}
      <div className="flex flex-col gap-y-8 ">
        <h2 className="font-display spark-after text-center font-bold gap-2.5 md:text-5xl text-3xl container text-stroke-lg max-lg:px-5 tracking-tight max-lg:max-w-72">
          ตัวอย่างความสำเร็จของลูกศิษย์ <span className="text-brand">The Progress</span>
        </h2>

        <div className="lg:mask-[linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] min-w-0 flex-1 overflow-hidden py-1.5">
          <div className="animate-marquee flex w-max gap-3 [@media(hover:hover)]:[&:has(.admit-item:hover)_.admit-item:not(:hover)]:opacity-35">
            <MarqueeRow />
            <MarqueeRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
