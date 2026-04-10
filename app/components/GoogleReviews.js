"use client";

const reviews = [
  {
    name: "Filip Ostrowski",
    initial: "F",
    color: "bg-cyan-600",
    time: "2 dni temu włączone",
    text: "Weszliśmy jako ostatni klienci. Zostaliśmy obsłużeni bardzo profesjonalnie. Kawa i drinki bardzo dobre. Przemiła atmosfera",
  },
  {
    name: "Martynka Maci...",
    initial: "M",
    color: "bg-emerald-900",
    time: "2 dni temu włączone",
    text: "Super atmosfera i przemili kelnerzy",
  },
  {
    name: "Noel Medina",
    initial: "N",
    color: "bg-pink-500",
    time: "2 dni temu włączone",
    text: "10/10 service, food and vibe. Great experience overall, super cool and...",
  },
  {
    name: "Thomas Butz",
    initial: "T",
    color: "bg-amber-900",
    time: "2 dni temu włączone",
    text: "Perfect food, perfect service, would ever come back",
  },
  {
    name: "Doro Andrews",
    initial: "D",
    color: "bg-amber-950",
    time: "2 dni temu włączone",
    text: "Super, przyjdziemy znowu zs kilka dni.",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-400">
      <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.8L12 16.8 5.8 20.2l1.6-6.8L2.2 8.9l6.9-.6L12 2z" />
    </svg>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-blue-500">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.5l-3.3-3.3 1.4-1.4 1.9 1.9 4.3-4.3 1.4 1.4-5.7 5.7z" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        d="M15 18l-6-6 6-6"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        d="M9 6l6 6-6 6"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  return (
    <section className="w-full px-4 py-6 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[length:18px_18px]">
      <div className="max-w-[1300px] mx-auto bg-white/80 backdrop-blur  p-4 ">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-5 border border-gray-200">
          <div>
            <div className="flex items-center gap-2">
 
              <span className="text-lg sm:text-xl font-semibold">Opinie</span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl sm:text-3xl font-bold">4.9</span>
              <Stars />
              <span className="text-gray-400 text-sm">(503)</span>
            </div>
          </div>
        <a href="https://share.google/expRJYIk5EAOOWzG2">
          <button className="text-gray-800 cursor-pointer border hover:bg-gray-800 hover:text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm w-full sm:w-auto" style={{textTransform: 'uppercase', letterSpacing: '2px'}}>
            Oceń nas na Google
          </button>
          </a>
        </div>

        {/* SLIDER */}
        <div className="relative mt-6">

          {/* <button className="cursor-pointer absolute left-0 sm:left-[-10px] top-1/2 -translate-y-1/2 bg-gray-800 text-white w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-gray-600 z-10 hidden md:flex">
            <ArrowLeft />
          </button>

          <button className="cursor-pointer absolute right-0 sm:right-[-10px] top-1/2 -translate-y-1/2 bg-gray-800 text-white w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-gray-600 z-10 hidden md:flex">
            <ArrowRight />
          </button> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-8 md:px-0">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-4 border border-gray-200 min-h-[280px] sm:min-h-[350px] lg:min-h-[420px] flex flex-col">

                <div className="flex gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center text-white rounded-full font-bold ${r.color}`}>
                    {r.initial}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm">{r.name}</span>
                      <CheckIcon />
                    </div>
                    <div className="text-xs text-gray-400">{r.time}</div>
                    <div className="text-xs text-blue-600 font-medium">Google</div>
                  </div>
                </div>

                <div className="mt-4">
                  <Stars />
                </div>

                <p className="mt-3 text-sm text-gray-800" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                  {r.text}
                </p>

                {r.hasMore && (
                  <div className="text-blue-600 text-sm mt-1 cursor-pointer">
                    Czytaj więcej
                  </div>
                )}

                {r.images && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <img src={r.images[0]} alt="Review" className="h-[120px] sm:h-[160px] w-full object-cover rounded" />
                    <div className="grid gap-2">
                      <img src={r.images[1]} alt="Review" className="h-[55px] sm:h-[75px] w-full object-cover rounded" />
                      <img src={r.images[2]} alt="Review" className="h-[55px] sm:h-[75px] w-full object-cover rounded" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        {/* <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div> */}

      </div>
    </section>
  );
}