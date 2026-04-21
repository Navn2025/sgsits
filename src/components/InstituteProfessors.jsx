import { Link } from 'react-router-dom';
import { instituteProfessors } from '../data/instituteProfessors';

function toDataUriSvg(name) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d9e4f2" />
        <stop offset="100%" stop-color="#a9bfd9" />
      </linearGradient>
    </defs>
    <rect width="420" height="420" fill="url(#g)" />
    <circle cx="210" cy="150" r="84" fill="#eed6be" />
    <rect x="95" y="250" width="230" height="150" rx="70" fill="#f8fbff" />
    <text x="210" y="214" text-anchor="middle" font-family="Arial, sans-serif" font-size="58" fill="#29466b">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function ProfessorRibbon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 56"
      className="h-[54px] w-[42px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'var(--prof-ribbon-color)' }}
    >
      <circle cx="24" cy="18" r="15" stroke="currentColor" strokeWidth="4" />
      <path d="M16 31L12 52L24 44L36 52L32 31" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

function ProfessorCard({ professor }) {
  return (
    <article
      className="mx-auto w-full max-w-[332px] px-6 pb-10 pt-7 text-center"
      style={{ backgroundColor: 'var(--prof-card-bg)' }}
    >
      <div className="relative mx-auto mb-6 w-fit">
        <div className="h-[206px] w-[206px] overflow-hidden rounded-[22px] bg-white">
          <img
            src={professor.image}
            alt={professor.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = toDataUriSvg(professor.name);
            }}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -right-[30px] -top-[36px]">
          <ProfessorRibbon />
        </div>
      </div>

      <h3 className="text-[22px] leading-[1.2] font-normal" style={{ color: 'var(--prof-name-color)' }}>
        {professor.name}
      </h3>
      <p className="mt-2 text-[20px] font-bold leading-none" style={{ color: 'var(--prof-year-color)' }}>
        {professor.year}
      </p>
      <p className="mx-auto mt-3 max-w-[240px] text-[16px] leading-[1.4]" style={{ color: 'var(--prof-dept-color)' }}>
        {professor.department}
      </p>

      <Link
        to={`/institute-professors/${professor.slug}`}
        className="mt-8 inline-flex items-center gap-2 text-[16px] font-normal hover:underline"
        style={{ color: 'var(--prof-link-color)' }}
      >
        Visit Webpage
        <span aria-hidden="true" className="text-[20px] leading-none">
          &rsaquo;
        </span>
      </Link>
    </article>
  );
}

export default function InstituteProfessors() {
  return (
    <section style={{ backgroundColor: 'var(--color-sgsits-bg)' }}>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1540px] px-6 py-4 text-[15px] md:px-10 lg:px-12">
          <span className="text-gray-600">Home</span>
          <span className="mx-3 text-gray-300">|</span>
          <span className="text-gray-600">Recognitions</span>
          <span className="mx-3 text-gray-300">|</span>
          <span className="font-semibold text-black">Institute Professors</span>
        </div>
      </div>

      <div className="relative h-[260px] sm:h-[320px] md:h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'var(--hero-img-url)' }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(11, 31, 58, calc(var(--hero-overlay-opacity, 0.45) + 0.08))' }}
        />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold uppercase tracking-[0.07em] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:text-5xl">
            Institute Professors
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1540px] px-6 py-10 md:px-10 lg:px-12">
        <div className="w-full rounded-xl border border-blue-100 bg-white px-6 py-8 shadow-sm md:px-10">
          <p className="text-[16px] leading-8 text-slate-700 md:text-[19px]">
            Institute Professors are celebrated for decades of teaching, research, mentoring, and institution
            building. Their work often shapes new laboratories, inspires student projects, and connects classroom
            learning with real-world innovation across engineering and science disciplines.
          </p>
          <p className="mt-4 text-[16px] leading-8 text-slate-700 md:text-[19px]">
            From publishing influential research to guiding young faculty and leading national collaborations, these
            professors represent the highest standards of academic excellence and public impact.
          </p>
          <p className="mt-4 text-[16px] leading-8 text-slate-700 md:text-[19px]">
            This section highlights distinguished faculty profiles and honors their lasting contributions to the
            institute&apos;s growth, reputation, and culture of learning.
          </p>
        </div>

        <div className="mb-8 mt-12 flex items-center gap-3">
          <span className="h-7 w-1" style={{ backgroundColor: 'var(--prof-year-color)' }} aria-hidden="true"></span>
          <h2 className="text-[30px] font-normal leading-none md:text-[31px]" style={{ color: 'var(--prof-name-color)' }}>
            Institute Professors
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {instituteProfessors.map((professor) => (
            <ProfessorCard key={`${professor.name}-${professor.year}`} professor={professor} />
          ))}
        </div>
      </div>

      <div className="relative mt-4 h-[180px] w-full sm:h-[230px] md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'var(--prof-footer-img-url)' }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, var(--prof-footer-overlay-opacity, 0.22))' }}
        />
      </div>
    </section>
  );
}
