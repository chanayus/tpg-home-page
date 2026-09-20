const tickerItems = ["TGAT TOP 0.47% ของประเทศ", "สอนมาแล้ว 9+ ปี", "ผู้เขียนหนังสือ BEST SELLER", "ดูแลรายคนจนสอบติด", "พี่วิน พี่เกด สอนเอง"];

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="flex shrink-0 " aria-hidden={ariaHidden || undefined}>
      {tickerItems.map((text) => (
        <li key={text} className="font-display text-sm px-8 font-extrabold tracking-wide whitespace-nowrap text-cream">
          {text} <span className="text-gold">✦</span>
        </li>
      ))}
    </ul>
  );
}

export function Ticker() {
  return (
    <div className="overflow-hidden bg-brand py-2.25">
      <div className="flex w-max animate-ticker">
        <TickerRow />
        <TickerRow ariaHidden />
        <TickerRow ariaHidden />
        <TickerRow ariaHidden />
      </div>
    </div>
  );
}
