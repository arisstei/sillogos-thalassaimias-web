import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ενημέρωση",
  description:
    "Χρήσιμη ενημέρωση για μέλη και οικογένειες: η μεσογειακή αναιμία, η εθελοντική αιμοδοσία, τα δικαιώματα των ατόμων με αναπηρία και νέα από την έρευνα.",
};

interface Source {
  label: string;
  href: string;
  org: string;
}

const ESTHA = "Ελληνικός Σύλλογος Θαλασσαιμίας (ΕΣΘΑ)";
const EKEA = "Εθνικό Κέντρο Αιμοδοσίας (ΕΚΕΑ)";
const ESAMEA = "Ε.Σ.Α.μεΑ.";
const TIF = "Thalassaemia International Federation (TIF)";

const BLOOD = "https://ekea.gov.gr/αιμοδότης";

const sections: {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  points?: string[];
  sources: Source[];
}[] = [
  {
    id: "nosos",
    kicker: "Η νόσος",
    title: "Τι είναι η μεσογειακή αναιμία",
    intro:
      "Η μεσογειακή αναιμία (θαλασσαιμία ή νόσος του Κούλεϋ) είναι κληρονομική νόσος του αίματος. Ο οργανισμός δεν μπορεί να παράγει επαρκή αιμοσφαιρίνη, με αποτέλεσμα βαριά αναιμία που εμφανίζεται ήδη από τη βρεφική ηλικία. Είναι ο πιο συχνός τύπος αναιμίας στη χώρα μας.",
    points: [
      "Κληρονομείται από τους γονείς. Όταν και οι δύο γονείς είναι φορείς, σε κάθε εγκυμοσύνη υπάρχει πιθανότητα 25% να γεννηθεί παιδί με τη νόσο, ανεξάρτητα από τις προηγούμενες εγκυμοσύνες.",
      "Οι φορείς δεν έχουν συμπτώματα και φαίνονται υγιείς. Η διάγνωση γίνεται μόνο με ειδικές εξετάσεις αίματος, γι’ αυτό και οι γενικές εξετάσεις δεν αρκούν.",
      "Στην Ελλάδα οι φορείς υπολογίζονται περίπου στο 8% του πληθυσμού, ενώ σε ορισμένες περιοχές το ποσοστό φτάνει το 15% ή και περισσότερο.",
      "Η βασική θεραπεία είναι η τακτική μετάγγιση συμπυκνωμένων ερυθρών αιμοσφαιρίων, συνήθως κάθε 15–20 ημέρες, με παραμονή στο νοσοκομείο 3–4 ωρών. Προτιμάται φρέσκο αίμα.",
    ],
    sources: [
      {
        label: "Μεσογειακή Αναιμία — αναλυτική ενημέρωση",
        href: "https://estha.gr/μεσογειακή-αναιμία/",
        org: ESTHA,
      },
      { label: "Thalassaemia (αγγλικά)", href: "https://thalassaemia.org.cy/haemoglobin-disorders/thalassaemia/", org: TIF },
    ],
  },
  {
    id: "aimodosia",
    kicker: "Αιμοδοσία",
    title: "Εθελοντική αιμοδοσία: τι πρέπει να ξέρετε",
    intro:
      "Η μετάγγιση είναι ζωτική για τους ασθενείς με μεσογειακή αναιμία και το αίμα δεν μπορεί να παραχθεί στο εργαστήριο. Εξαρτάται αποκλειστικά από εθελοντές αιμοδότες. Το Εθνικό Κέντρο Αιμοδοσίας διαθέτει αναλυτικές οδηγίες για κάθε ερώτηση που μπορεί να έχει κάποιος πριν δώσει αίμα.",
    points: [
      "Ποιος μπορεί να δώσει αίμα και πότε δεν επιτρέπεται η αιμοδοσία.",
      "Πώς γίνεται η διαδικασία, βήμα προς βήμα, και τι γίνεται με το αίμα που προσφέρετε.",
      "Ομάδες αίματος, ασφάλεια του αίματος και συχνές ερωτήσεις.",
      "Πού μπορείτε να προσφέρετε αίμα και ημερολόγιο προγραμματισμένων αιμοδοσιών.",
    ],
    sources: [
      { label: "Ποιος μπορεί να δώσει αίμα", href: `${BLOOD}/για-να-γίνω-αιμοδότης/ποιός-μπορεί-να-δώσει-αίμα`, org: EKEA },
      { label: "Πότε δεν επιτρέπεται να αιμοδοτήσω", href: `${BLOOD}/για-να-γίνω-αιμοδότης/πότε-δεν-επιτρέπεται-να-αιμοδοτήσω`, org: EKEA },
      { label: "Διαδικασία αιμοδοσίας", href: `${BLOOD}/για-να-γίνω-αιμοδότης/διαδικασία-αιμοδοσίας`, org: EKEA },
      { label: "Συχνές ερωτήσεις", href: `${BLOOD}/συχνές-ερωτήσεις`, org: EKEA },
      { label: "Ημερολόγιο αιμοδοσιών", href: "https://ekea.gov.gr/events/", org: EKEA },
      { label: "Εθελοντική Αιμοδοσία", href: "https://estha.gr/εθελοντική-αιμοδοσία/", org: ESTHA },
    ],
  },
  {
    id: "dikaiomata",
    kicker: "Δικαιώματα",
    title: "Δικαιώματα και υποστήριξη ατόμων με αναπηρία",
    intro:
      "Τα άτομα με μεσογειακή αναιμία και οι οικογένειές τους έχουν δικαιώματα που αφορούν επιδόματα, πιστοποίηση αναπηρίας (ΚΕΠΑ), άδειες και ωράρια εργασίας, συνταξιοδοτικά και απαλλαγές. Τα έγγραφα και οι εγκύκλιοι που μας αφορούν συγκεντρώνονται στη σελίδα Νομοθεσία, ενώ η Εθνική Συνομοσπονδία Ατόμων με Αναπηρία ενημερώνει συστηματικά για τις εξελίξεις.",
    sources: [
      { label: "Νομοθεσία — έγγραφα και εγκύκλιοι του Συλλόγου", href: "/nomothesia", org: "Σύλλογος Θαλασσαιμίας Ηρακλείου-Λασιθίου" },
      { label: "Νέα και ανακοινώσεις", href: "https://www.esamea.gr/articles/news-announcements", org: ESAMEA },
      { label: "Εβδομαδιαία ανασκόπηση", href: "https://www.esamea.gr/articles/weekly-review", org: ESAMEA },
      { label: "Οδηγοί και εγχειρίδια", href: "https://www.esamea.gr/articles/guidebooks", org: ESAMEA },
      { label: "Διεθνής Σύμβαση του ΟΗΕ για τα δικαιώματα των ατόμων με αναπηρία", href: "https://www.esamea.gr/articles/uncrpd", org: ESAMEA },
    ],
  },
  {
    id: "ereuna",
    kicker: "Έρευνα",
    title: "Νέες θεραπείες και έρευνα",
    intro:
      "Η έρευνα για τη θαλασσαιμία προχωρά διεθνώς, με νέες θεραπευτικές προσεγγίσεις και κλινικές μελέτες. Η Διεθνής Ομοσπονδία Θαλασσαιμίας (TIF) δημοσιεύει ενημερώσεις για κλινικές δοκιμές, νέα και εκπαιδευτικό υλικό, κυρίως στα αγγλικά.",
    sources: [
      { label: "Clinical Trial Updates", href: "https://thalassaemia.org.cy/haemoglobin-disorders/clinical-trial-updates/", org: TIF },
      { label: "Νέα (News)", href: "https://thalassaemia.org.cy/media-centre/news/", org: TIF },
      { label: "Βίντεο", href: "https://thalassaemia.org.cy/media-centre/videos/", org: TIF },
      { label: "TIFLIX — βιβλιοθήκη βίντεο για τη θαλασσαιμία", href: "https://tiflix.tv", org: TIF },
    ],
  },
  {
    id: "periodiko",
    kicker: "Περιοδικό",
    title: "Περιοδικό «Θέματα Αναπηρίας»",
    intro:
      "Το περιοδικό της Ε.Σ.Α.μεΑ. φιλοξενεί συνεντεύξεις, αφιερώματα και κείμενα για τα δικαιώματα των ατόμων με αναπηρία και τα άτομα με χρόνιες παθήσεις. Τα παλαιότερα τεύχη είναι διαθέσιμα στο αρχείο της Συνομοσπονδίας.",
    sources: [
      { label: "Αρχείο περιοδικού «Θέματα Αναπηρίας»", href: "https://www.esamea.gr/articles/archive-magazine", org: ESAMEA },
    ],
  },
];

export default function InformationPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
          Χρήσιμη ενημέρωση
        </p>
        <h1 className="font-serif text-4xl font-semibold text-stone-900">Ενημέρωση</h1>
        <p className="mt-4 leading-relaxed text-stone-600">
          Συγκεντρώσαμε για τα μέλη και τις οικογένειές τους τα βασικά για τη νόσο, την αιμοδοσία, τα
          δικαιώματα και την έρευνα, με σύνδεσμο προς τις επίσημες πηγές για όσους θέλουν να μάθουν
          περισσότερα.
        </p>
      </header>

      <nav aria-label="Ενότητες" className="mb-14 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            {s.kicker}
          </a>
        ))}
      </nav>

      <div className="space-y-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-40">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
              {s.kicker}
            </p>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">{s.title}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-stone-700">{s.intro}</p>

            {s.points ? (
              <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-stone-700">
                {s.points.map((p) => (
                  <li key={p} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.sources.map((src) => {
                const internal = src.href.startsWith("/");
                const inner = (
                  <>
                    <span className="block font-medium text-stone-900 group-hover:text-[color:var(--color-accent)]">
                      {src.label} <span aria-hidden>{internal ? "→" : "↗"}</span>
                    </span>
                    <span className="mt-1 block text-xs text-stone-500">Πηγή: {src.org}</span>
                  </>
                );
                const cls =
                  "group block rounded-lg border border-stone-200 bg-white p-4 transition-shadow hover:shadow-md";
                return (
                  <li key={src.href}>
                    {internal ? (
                      <Link href={src.href} className={cls}>
                        {inner}
                      </Link>
                    ) : (
                      <a href={src.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-16 max-w-3xl border-t border-stone-200 pt-6 text-sm leading-relaxed text-stone-500">
        Οι πληροφορίες έχουν ενημερωτικό χαρακτήρα και δεν υποκαθιστούν την ιατρική συμβουλή. Για
        θέματα υγείας απευθυνθείτε στον θεράποντα ιατρό σας και για δικαιώματα και παροχές στον
        Σύλλογο ή στις αρμόδιες υπηρεσίες.
      </p>
    </div>
  );
}
