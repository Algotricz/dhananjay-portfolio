import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const challenges = [
  {
    num: '01',
    title: 'Turning broad ideas into an executable product plan',
    context: 'Early-stage educational product with multiple ideas being explored simultaneously.',
    problem: 'Too many possible features, but no clear direction on what should be built first or what would work in the market.',
    role: 'Evaluated ideas, conducted market research, and defined the initial scope.',
    did: [
      'Evaluated proposed ideas based on feasibility and impact',
      'Conducted market research to validate assumptions',
      'Identified core features for the initial version',
      'Separated immediate priorities from future roadmap items',
    ],
    outcome: 'Brought clarity to product direction. Helped the team focus on a realistic and executable scope. Avoided overbuilding in early stages.',
    learned: 'Strong ideas need structured prioritization. Would improve by incorporating earlier user validation alongside market research.',
  },
  {
    num: '02',
    title: 'Aligning cross-functional teams on product features',
    context: 'Worked with both marketing and development teams during product planning.',
    problem: 'Misalignment between teams led to confusion around features and expectations.',
    role: 'Acted as a bridge to align teams and clarify product direction.',
    did: [
      'Facilitated discussions between marketing and development',
      'Clarified feature scope and expectations',
      'Proposed deferring non-critical features to later versions',
      'Created a Product Requirements Document (PRD)',
      'Led internal discussions to get alignment and approval',
    ],
    outcome: 'Reduced misunderstandings between teams. Created a shared understanding of product scope. Enabled smoother execution with an approved plan.',
    learned: 'Alignment is critical for execution. Would improve by documenting and communicating requirements earlier in the process.',
  },
  {
    num: '03',
    title: 'Bringing structure to team execution through sprint planning',
    context: 'Startup environment where teams worked on multiple tasks without a structured execution framework.',
    problem: 'No clear system for planning, tracking, or reviewing work — leading to lack of clarity, inconsistent progress, and potential delays.',
    role: 'Took ownership of introducing a structured execution process and aligning teams around clear goals.',
    did: [
      'Introduced a sprint-based workflow tailored to the team\'s working style',
      'Defined weekly goals for each team based on priorities',
      'Broke down high-level goals into actionable tasks with team input',
      'Conducted sprint planning and weekly review meetings',
      'Continuously monitored progress and resolved blockers',
    ],
    outcome: 'Brought structure and consistency to team execution. Improved clarity on deliverables. Reduced delays by proactively identifying issues.',
    learned: 'Execution systems need to fit the team\'s culture. Would improve with better tracking metrics to measure sprint effectiveness.',
  },
  {
    num: '04',
    title: 'Aligning execution with business goals through financial planning',
    context: 'After establishing a structured execution system, focus shifted to defining company-level goals tied to business outcomes.',
    problem: 'No clear financial direction. Decisions were not directly tied to cash flow realities or sustainability.',
    role: 'Took initiative to understand the financial side and align execution with company-level goals.',
    did: [
      'Learned fundamentals of cash flow statements and business financials',
      'Worked on cash flow projections to understand inflows, outflows, and sustainability',
      'Identified what would be required to move towards positive net cash flow',
      'Used projections to help redefine company goals',
      'Translated financial goals into actionable sales targets',
      'Ensured sprint planning was aligned with these targets',
    ],
    outcome: 'Clearer connection between execution and business outcomes. Helped shift focus toward financial sustainability. Enabled teams to work toward defined targets.',
    learned: 'Strong execution needs to be tied to business realities. Would improve by validating projections with more real-world data over time.',
  },
  {
    num: '05',
    title: 'Designing conversational flows for AI-driven lead conversion',
    context: 'Integrated an AI-driven calling system aimed at handling cold leads and converting them into potential customers.',
    problem: 'Designing conversations that didn\'t feel robotic while still guiding leads effectively toward conversion.',
    role: 'Collaborated on designing the end-to-end conversational flow.',
    did: [
      'Mapped out detailed conversation flows for different lead responses',
      'Designed conditional paths (interested, not interested, wrong number, unclear responses)',
      'Defined how the AI should respond in each scenario to keep conversations natural',
      'Thought through transitions between AI and human intervention',
      'Focused on making conversations feel human rather than scripted',
    ],
    outcome: 'Created a structured conversation system handling multiple real-world scenarios. Improved clarity on AI interaction design for lead conversion. Reduced ambiguity for the development team.',
    learned: 'Designing for AI is about human psychology, not just logic. Would improve by testing real conversations and refining flows based on user behavior.',
  },
]

function ChallengeCard({ c, index }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef()
  const cardRef = useRef()

  useEffect(() => {
    if (!bodyRef.current) return
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.out' }
      )
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' })
    }
  }, [open])



  return (
    <div
      ref={cardRef}
      className="ch-card-item"
      data-cursor
      onClick={() => setOpen(o => !o)}
      style={{
        borderBottom: '1px solid var(--line)',
        cursor: 'pointer',
        transition: 'background 0.3s',
        padding: '0 var(--sp-md)',
        background: open ? 'var(--challenge-open)' : 'transparent',
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.75rem 0',
      }}>
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            fontWeight: 400, letterSpacing: '0.1em', color: 'var(--lilac)',
          }}>{c.num}</span>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)',
            fontWeight: 300, color: open ? 'var(--lavender)' : 'var(--ink)',
            letterSpacing: '0.01em', transition: 'color 0.3s', lineHeight: 1.3,
          }}>{c.title}</h3>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
          fontWeight: 100, color: 'var(--lilac)',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.3s var(--ease-expo)',
          flexShrink: 0,
        }}>+</span>
      </div>

      {/* Expandable body */}
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="ch-body-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
          paddingBottom: '2rem',
        }}>
          <div>
            <Label>Context</Label>
            <P>{c.context}</P>
            <Label style={{ marginTop: '1.25rem' }}>Problem</Label>
            <P>{c.problem}</P>
            <Label style={{ marginTop: '1.25rem' }}>My Role</Label>
            <P>{c.role}</P>
          </div>
          <div>
            <Label>What I Did</Label>
            <ul style={{ listStyle: 'none', marginBottom: '1.25rem' }}>
              {c.did.map((d, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--purple)', fontSize: '0.55rem', paddingTop: '0.5em', flexShrink: 0 }}>◆</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</span>
                </li>
              ))}
            </ul>
            <Label>Outcome</Label>
            <P>{c.outcome}</P>
            <Label style={{ marginTop: '1.25rem' }}>What I Learned</Label>
            <P style={{ fontStyle: 'italic', color: 'var(--muted)' }}>{c.learned}</P>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, style }) {
  return (
    <p style={{
      fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
      fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
      color: 'var(--lilac)', marginBottom: '0.6rem', ...style,
    }}>{children}</p>
  )
}

function P({ children, style }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
      fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.7, ...style,
    }}>{children}</p>
  )
}

export default function Challenges() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ch-heading',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.ch-heading', start: 'top 85%' },
        }
      )
      gsap.fromTo('.ch-intro',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ch-intro', start: 'top 85%' },
        }
      )

      // Stagger all challenge cards from their container
      gsap.fromTo('.ch-card-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.ch-cards-list', start: 'top 85%' },
        }
      )

      // Heading parallax
      gsap.to('.ch-heading', {
        y: -25,
        scrollTrigger: {
          trigger: '.ch-heading',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Eyebrow wipe
      gsap.fromTo('.ch-eyebrow',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ch-eyebrow', start: 'top 90%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="about" style={{
      padding: 'var(--sp-xl) clamp(1.5rem,5vw,4rem)',
      background: 'var(--bg)',
    }}>
      <div className="divider" style={{ marginBottom: 'var(--sp-lg)' }} />
      <p className="eyebrow ch-eyebrow" style={{ marginBottom: '1.75rem' }}>Selected Challenges</p>

      <div className="ch-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--sp-lg)', marginBottom: 'var(--sp-lg)', alignItems: 'start' }}>
        <h2 className="ch-heading" style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
          fontWeight: 100, letterSpacing: '-0.02em', textTransform: 'uppercase',
          color: 'var(--ink)', lineHeight: 1.05,
        }}>
          Problems<br />I've<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--lavender), var(--lilac))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}>Solved.</span>
        </h2>
        <p className="ch-intro" style={{
          fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'var(--text-md)', color: 'var(--ink-2)', lineHeight: 1.65,
          maxWidth: '55ch', paddingTop: '0.5rem',
        }}>
          These are some of the key problems I've worked on and how I approached them.
          Click any challenge to expand the full story.
        </p>
      </div>

      <div className="ch-cards-list" style={{ borderTop: '1px solid var(--line)' }}>
        {challenges.map((c, i) => <ChallengeCard key={c.num} c={c} index={i} />)}
      </div>
    </section>
  )
}
