/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Check, Copy, Menu, X } from 'lucide-react';
import { LakePathArtwork } from './components/LakePathArtwork';

type SectionId = 'hero' | 'intro' | 'info' | 'contact';

interface NavItem {
  id: SectionId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: '첫 화면' },
  { id: 'intro', label: '행사 소개' },
  { id: 'info', label: '핵심 정보' },
  { id: 'contact', label: '문의' },
];

const EVENT_SUMMARY_TEXT = [
  "2027 봄 워크숍 '함께 걷는 하루'",
  '주최: 온담컴퍼니 경영지원팀',
  '일시: 2027년 4월 16일(금) 09:30~16:00',
  '장소: 광교호수공원',
  '대상: 온담컴퍼니 전 직원',
  '문의: 경영지원팀 (연락처 미정)',
].join('\n');

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sectionIds: SectionId[] = ['hero', 'intro', 'info', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(EVENT_SUMMARY_TEXT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EVENT_SUMMARY_TEXT;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F7] text-[#181D19]">
      {/* 상단 고정 메뉴: 3-Zone Contract */}
      <header className="sticky top-0 z-30 h-14 md:h-16 bg-[#F8F9F7]/95 backdrop-blur-sm border-b border-[#E2E6DF]">
        <div className="max-w-[1120px] h-full mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: 단일 브랜드명 */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="text-base md:text-lg font-bold tracking-tight text-[#181D19] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332] rounded-sm"
          >
            온담컴퍼니
          </a>

          {/* Zone 2: 데스크톱 내비게이션 링크 */}
          <nav
            aria-label="페이지 영역 이동"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#556058]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332] ${
                    isActive
                      ? 'text-[#1B4332] border-[#1B4332] font-semibold'
                      : 'border-transparent hover:text-[#181D19] hover:border-[#CBD4C9]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 단일 주요 버튼 + 모바일 메뉴 토글 */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('info')}
              className="px-4 py-2 min-h-[40px] text-xs md:text-sm font-medium text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
            >
              핵심 정보 보기
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#DCE2DA] bg-white text-[#181D19] hover:bg-[#EFF3EE] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 모바일 펼침 메뉴 */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-panel"
            aria-label="모바일 영역 이동"
            className="md:hidden border-b border-[#E2E6DF] bg-[#F8F9F7] px-4 py-3 shadow-sm"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`min-h-[44px] px-3 flex items-center rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#EFF3EE] text-[#1B4332] font-semibold'
                        : 'text-[#39423B] hover:bg-[#EFF3EE]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* 1. 첫 화면 */}
        <section
          id="hero"
          className="scroll-mt-16 border-b border-[#E2E6DF]"
        >
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-14 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#556058] flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>온담컴퍼니 경영지원팀</span>
                    <span aria-hidden="true">·</span>
                    <span>사내 행사 안내</span>
                  </p>

                  <h1
                    style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
                    className="mt-5 text-[clamp(2.125rem,4.4vw,3.5rem)] leading-[1.22] font-bold tracking-tight text-[#181D19]"
                  >
                    2027 봄 워크숍
                    <span className="block mt-1 text-[#1B4332]">&lsquo;함께 걷는 하루&rsquo;</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#3D463F]">
                    봄날, 동료와 나란히 걷는 하루
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-[#E2E6DF] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                    <div>
                      <dt className="text-xs font-medium text-[#556058]">날짜</dt>
                      <dd className="mt-1.5 text-base font-semibold text-[#181D19] tabular-nums">
                        2027년 4월 16일(금) 09:30~16:00
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#556058]">장소</dt>
                      <dd className="mt-1.5 text-base font-semibold text-[#181D19]">
                        광교호수공원
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => scrollToSection('info')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-medium text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
                  >
                    <span>핵심 정보 확인하기</span>
                    <ArrowDown className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <LakePathArtwork />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 행사 소개 (2문장) */}
        <section
          id="intro"
          className="scroll-mt-16 border-b border-[#E2E6DF] bg-white"
        >
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-4">
                <h2
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181D19]"
                >
                  01. 행사 소개
                </h2>
                <p className="mt-2 text-sm text-[#556058]">
                  온담컴퍼니 경영지원팀 주최
                </p>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-2xl text-base sm:text-[17px] leading-[1.85] text-[#28302A]">
                  2027 봄 워크숍 &lsquo;함께 걷는 하루&rsquo;는 온담컴퍼니 전 직원이 잠시 일상 업무에서 벗어나 야외에서 한자리에 모이는 사내 행사입니다.
                  봄날의 광교호수공원을 함께 걸으며 동료들과 편안하게 교류하는 시간을 나누고자 온담컴퍼니 경영지원팀에서 마련했습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 핵심 정보 (일시, 장소, 대상) */}
        <section
          id="info"
          className="scroll-mt-16 border-b border-[#E2E6DF] bg-[#F8F9F7]"
        >
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181D19]"
                >
                  02. 핵심 정보
                </h2>
                <p className="mt-2 text-sm text-[#556058]">
                  일시, 장소, 대상을 한눈에 확인할 수 있습니다.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-medium text-[#181D19] bg-white border border-[#DCE2DA] hover:bg-[#EFF3EE] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1B4332]" aria-hidden="true" />
                    <span>안내 요약 복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#556058]" aria-hidden="true" />
                    <span>안내 요약 복사</span>
                  </>
                )}
              </button>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-2 sm:gap-5">
              <div className="min-w-0 rounded-xl border border-[#DCE2DA] bg-white p-3 sm:p-6 md:p-7 flex flex-col justify-between gap-3 sm:gap-5">
                <dt className="text-xs sm:text-sm font-semibold text-[#1B4332]">일시</dt>
                <dd className="text-[13px] sm:text-lg md:text-[22px] font-semibold leading-snug text-[#181D19] tabular-nums">
                  2027년 4월 16일(금)
                  <span className="block mt-1 text-xs sm:text-base md:text-lg font-medium text-[#3D463F]">
                    09:30~16:00
                  </span>
                </dd>
              </div>

              <div className="min-w-0 rounded-xl border border-[#DCE2DA] bg-white p-3 sm:p-6 md:p-7 flex flex-col justify-between gap-3 sm:gap-5">
                <dt className="text-xs sm:text-sm font-semibold text-[#1B4332]">장소</dt>
                <dd className="text-[13px] sm:text-lg md:text-[22px] font-semibold leading-snug text-[#181D19]">
                  광교호수공원
                </dd>
              </div>

              <div className="min-w-0 rounded-xl border border-[#DCE2DA] bg-white p-3 sm:p-6 md:p-7 flex flex-col justify-between gap-3 sm:gap-5">
                <dt className="text-xs sm:text-sm font-semibold text-[#1B4332]">대상</dt>
                <dd className="text-[13px] sm:text-lg md:text-[22px] font-semibold leading-snug text-[#181D19]">
                  온담컴퍼니 전 직원
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 4. 문의 */}
        <section id="contact" className="scroll-mt-16 bg-white">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4">
                <h2
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181D19]"
                >
                  03. 문의
                </h2>
                <p className="mt-2 text-sm text-[#556058]">
                  행사 관련 안내 담당 부서
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-xl border border-[#DCE2DA] bg-[#F8F9F7] p-7">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <dt className="text-xs font-medium text-[#556058]">문의처</dt>
                      <dd className="mt-1.5 text-lg font-semibold text-[#181D19]">
                        경영지원팀
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#556058]">연락처</dt>
                      <dd className="mt-1.5 text-lg font-semibold text-[#181D19]">
                        미정
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-6 pt-5 border-t border-[#E2E6DF] text-sm text-[#556058]">
                    온담컴퍼니 경영지원팀에서 주관하는 행사이며, 세부 연락처는 현재 미정입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 안내 */}
      <footer className="border-t border-[#E2E6DF] bg-[#F2F4F0]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#556058]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-[#181D19]">온담컴퍼니</span>
            <span aria-hidden="true">·</span>
            <span>2027 봄 워크숍 &lsquo;함께 걷는 하루&rsquo;</span>
          </div>

          <p className="font-medium text-[#3D463F]">교육용 가상 행사입니다</p>

          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg border border-[#DCE2DA] bg-white text-[#181D19] hover:bg-[#EFF3EE] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>맨 위로</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
