import { Link, Navigate, useParams } from 'react-router-dom';
import { getProfessorBySlug } from '../data/instituteProfessors';

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

export default function ProfessorProfile() {
  const { slug } = useParams();
  const professor = getProfessorBySlug(slug ?? '');

  if (!professor) {
    return <Navigate to="/institute-professors" replace />;
  }

  return (
    <section style={{ backgroundColor: 'var(--color-sgsits-bg)' }}>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1540px] px-6 py-4 text-[15px] md:px-10 lg:px-12">
          <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
          <span className="mx-3 text-gray-300">|</span>
          <Link to="/institute-professors" className="text-gray-600 hover:text-black">Institute Professors</Link>
          <span className="mx-3 text-gray-300">|</span>
          <span className="font-semibold text-black">{professor.name}</span>
        </div>
      </div>

      <div className="relative h-[230px] sm:h-[300px] md:h-[360px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'var(--hero-img-url)' }} />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(11, 31, 58, calc(var(--hero-overlay-opacity, 0.45) + 0.12))' }}
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1540px] items-end px-6 pb-10 md:px-10 lg:px-12">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/85">Institute Professor</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{professor.name}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1540px] px-6 py-10 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <article
            className="w-full px-6 pb-10 pt-7 text-center"
            style={{ backgroundColor: 'var(--prof-card-bg)' }}
          >
            <div className="mx-auto mb-6 h-[206px] w-[206px] overflow-hidden rounded-[22px] bg-white">
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
            <h2 className="text-[22px] leading-[1.2] font-normal" style={{ color: 'var(--prof-name-color)' }}>
              {professor.name}
            </h2>
            <p className="mt-2 text-[20px] font-bold leading-none" style={{ color: 'var(--prof-year-color)' }}>
              {professor.year}
            </p>
            <p className="mx-auto mt-3 max-w-[240px] text-[16px] leading-[1.4]" style={{ color: 'var(--prof-dept-color)' }}>
              {professor.department}
            </p>
          </article>

          <div className="rounded-xl border border-blue-100 bg-white px-6 py-8 shadow-sm md:px-10">
            <h3 className="text-2xl font-semibold" style={{ color: 'var(--prof-name-color)' }}>
              Profile
            </h3>
            <p className="mt-4 text-[16px] leading-8 text-slate-700 md:text-[18px]">
              {professor.profileText}
            </p>

            <h4 className="mt-8 text-xl font-semibold" style={{ color: 'var(--prof-name-color)' }}>
              Key Contributions
            </h4>
            <ul className="mt-4 space-y-3">
              {professor.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-3 text-[16px] leading-7 text-slate-700">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: 'var(--prof-year-color)' }} />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/institute-professors"
              className="mt-8 inline-flex items-center gap-2 text-[16px] font-medium hover:underline"
              style={{ color: 'var(--prof-link-color)' }}
            >
              &larr; Back to Institute Professors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

