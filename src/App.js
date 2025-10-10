import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';

const MotivationWorkbook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');

  const [basicInfo, setBasicInfo] = useState({
    industry: '',
    position: '',
    company: ''
  });

  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    if (password === 'career2025') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 산업, 직무, 회사를 입력하세요' },
    {
      id: 1,
      title: 'STEP 1: 관심 계기',
      subtitle: '이 분야에 관심을 갖게 된 구체적인 순간',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 분야에 처음 관심을 갖게 된 구체적인 계기는 무엇인가요?',
          hint: '언제, 어디서, 무엇을 통해 관심이 생겼는지 구체적으로',
          placeholder: '예: 대학교 2학기 "마케팅원론" 수업에서 진행한 "스타트업 마케팅 전략 수립" 팀 프로젝트가 계기였습니다...',
          rows: 4,
          guide: {
            description: '답변 가이드: 언제, 어디서, 무엇을 통해 관심이 생겼는지 구체적으로',
            diagnosis: '즉석자가진단: 면접관이 “그때 어떤 기분이었나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '정확히 언제였나요? (학년, 학기, 년도)',
              '어떤 상황에서였나요? (수업, 동아리, 대외활동)'
            ],
            ifDifficult: '계기가 평범하다고 느껴질 때 → 참고자료 1장 “분야별 관심 계기 아이디어 뱅크”',
            ifStillDifficult: '시기가 기억 안날 때 → 참고자료 2.1절 “경험 시간순 정리법”',
            example: '대학교 2학년 2학기 \'마케팅원론\' 수업에서 진행한 \'스타트업 마케팅 전략 수립\' 팀 프로젝트가 계기였습니다. 실제 스타트업 대표님과 협업하여 마케팅 전략을 수립하는 과정에서...'
          }
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 그 계기에서 무엇이 특별히 인상 깊었나요?',
          hint: '단순 감상이 아닌 구체적인 깨달음이나 발견',
          placeholder: '예: 데이터 분석을 통해 20대 타겟의 숨은 니즈를 발견하고, 이를 바탕으로 만든 캠페인이 실제로 300% 매출 상승...',
          rows: 3,
          guide: {
            description: '답변 가이드: 단순 감상이 아닌 구체적인 깨달음이나 발견',
            diagnosis: '즉석자가진단: 면접관이 “왜 그게 특별했나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '무엇이 당신을 감동시켰나요?',
              '그 깨달음이 당신의 가치관과 어떻게 연결되나요?'
            ],
            ifDifficult: '계기에서 얻은 구체적인 인사이트를 떠올려보세요.',
            ifStillDifficult: '그 순간의 감정을 세부적으로 분석해보세요.',
            example: '데이터 분석을 통해 20대 타겟의 숨은 니즈를 발견하고, 이를 바탕으로 만든 캠페인이 실제로 300% 매출 상승...'
          }
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 그 이후 어떤 생각이나 행동의 변화가 있었나요?',
          hint: '관심이 실제 행동으로 이어진 구체적 사례',
          placeholder: '예: 그날 저녁부터 마케팅 관련 유튜브 채널을 구독하기 시작했고, 다음 주에는 마케팅 동아리에 가입했습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 관심이 실제 행동으로 이어진 구체적 사례',
            diagnosis: '즉석자가진단: “그 변화가 지속되었나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적인 행동 변화는 무엇이었나요?',
              '그 행동이 장기적으로 이어졌나요?'
            ],
            ifDifficult: '경험정리 문서의 “도전” 시트에서 해당 분야와 관련된 활동들을 찾아보세요.',
            ifStillDifficult: '작은 변화부터 적어보세요.',
            example: '그날 저녁부터 마케팅 관련 유튜브 채널을 구독하기 시작했고, 다음 주에는 마케팅 동아리에 가입했습니다...'
          }
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 핵심 메시지',
      subtitle: '지원동기의 핵심을 한 문장으로',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 관심을 이어가기 위해 구체적으로 어떤 활동을 했나요?',
          hint: '측정 가능하고 검증 가능한 활동',
          placeholder: '예: 6개월간 마케팅 이론서 10권을 읽고, 브랜드 분석 블로그를 운영하며 20개 기업을 분석했습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 측정 가능하고 검증 가능한 활동',
            diagnosis: '즉석자가진단: “그 활동의 구체적 성과는?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '활동의 기간과 빈도는?',
              '검증 가능한 결과는?'
            ],
            ifDifficult: '실전가이드 2.1절 경험기반 원칙 참조',
            ifStillDifficult: '작은 활동부터 나열해보세요.',
            example: '6개월간 마케팅 이론서 10권을 읽고, 브랜드 분석 블로그를 운영하며 20개 기업을 분석했습니다...'
          }
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 지금 내가 보유한 이 직무 관련 가장 강력한 역량은?',
          hint: '구체적 경험과 성과로 입증 가능한 역량',
          placeholder: '예: MZ세대 트렌드 분석 능력과 SNS 콘텐츠 기획 역량입니다. 인스타그램 계정을 3개월 만에 팔로워 1,500명...',
          rows: 3,
          guide: {
            description: '답변 가이드: 구체적 경험과 성과로 입증 가능한 역량',
            diagnosis: '즉석자가진단: “그 역량을 증명할 사례는?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적 경험은?',
              '성과 지표는?'
            ],
            ifDifficult: '실전가이드 2.3절 적합성 원칙 참조',
            ifStillDifficult: '자신의 강점을 숫자로 표현해보세요.',
            example: 'MZ세대 트렌드 분석 능력과 SNS 콘텐츠 기획 역량입니다. 인스타그램 계정을 3개월 만에 팔로워 1,500명...'
          }
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 여러 회사 중 왜 이 회사인가요?',
          hint: '회사의 구체적 특성과 본인의 연결점',
          placeholder: '예: OOO만의 \'데이터 기반 의사결정\' 문화와 \'빠른 실행력\'이 제가 추구하는 마케팅 방식과 정확히 일치합니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 회사의 구체적 특성과 본인의 연결점',
            diagnosis: '즉석자가진단: “다른 회사는 왜 안 되나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '회사 특성은?',
              '본인과 연결점은?'
            ],
            ifDifficult: '실전가이드 2.4절 연결성 원칙 참조',
            ifStillDifficult: '회사 뉴스나 홈페이지를 참고하세요.',
            example: 'OOO만의 \'데이터 기반 의사결정\' 문화와 \'빠른 실행력\'이 제가 추구하는 마케팅 방식과 정확히 일치합니다...'
          }
        },
        {
          id: 'q1_2_4',
          label: 'Q1.2.4. 위 세 가지를 하나로 연결한 핵심 문장을 작성하세요',
          hint: '관심 계기 + 나의 역량 + 회사 선택 이유',
          placeholder: '예: 데이터로 고객을 이해하는 마케팅에 매료되어 관련 역량을 키워왔고, 이를 가장 잘 발휘할 수 있는 곳이 OOO라고 확신합니다.',
          rows: 2,
          guide: {
            description: '답변 가이드: 관심 계기 + 나의 역량 + 회사 선택 이유',
            diagnosis: '즉석자가진단: “이 문장이 전체 동기를 요약하나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '연결이 자연스러운가?',
              '구체적인가?'
            ],
            ifDifficult: '실전가이드 3라운드 연결 템플릿 활용',
            ifStillDifficult: '단순히 연결해보세요.',
            example: '데이터로 고객을 이해하는 마케팅에 매료되어 관련 역량을 키워왔고, 이를 가장 잘 발휘할 수 있는 곳이 OOO라고 확신합니다.'
          }
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 관심 계기 구체화',
      subtitle: '첫 관심이 어떻게 깊어졌는지',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. Q1.1.1(이 분야에 처음 관심을 갖게 된 구체적인 계기는 무엇인가요?)의 계기가 일어난 구체적 상황을 묘사해주세요',
          hint: '시간, 장소, 상황의 디테일',
          placeholder: '예: 2023년 가을, 팀원 4명과 밤 11시까지 도서관에서 회의하던 중이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 시간, 장소, 상황의 디테일',
            diagnosis: '즉석자가진단: “그 상황을 생생히 묘사할 수 있나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '시간과 장소는?',
              '상황의 세부사항은?'
            ],
            ifDifficult: '기억을 더듬어보세요.',
            ifStillDifficult: '대략적인 상황이라도 적어보세요.',
            example: '2023년 가을, 팀원 4명과 밤 11시까지 도서관에서 회의하던 중이었습니다...'
          }
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 그때 어떤 감정이나 생각이 들었나요?',
          hint: '내면의 변화와 깨달음',
          placeholder: '예: "이런 일을 매일 한다면 정말 행복하겠다"는 생각이 들었고, 처음으로 제 진로가 명확해지는 느낌이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 내면의 변화와 깨달음',
            diagnosis: '즉석자가진단: “그 감정이 왜 중요했나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적인 감정은?',
              '그 생각이 이어진 결과는?'
            ],
            ifDifficult: '감정을 키워드로 나열해보세요.',
            ifStillDifficult: '기본적인 감정부터 시작하세요.',
            example: '"이런 일을 매일 한다면 정말 행복하겠다"는 생각이 들었고, 처음으로 제 진로가 명확해지는 느낌이었습니다...'
          }
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 이 경험이 나의 어떤 가치관과 연결되나요?',
          hint: '개인의 신념이나 추구하는 가치',
          placeholder: '예: 저는 늘 "데이터는 거짓말하지 않는다"고 믿어왔고, 숫자로 문제를 해결하는 것을 좋아합니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 개인의 신념이나 추구하는 가치',
            diagnosis: '즉석자가진단: “그 가치관이 어떻게 형성되었나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '개인 가치관은?',
              '연결점은?'
            ],
            ifDifficult: '자신의 핵심 가치를 떠올려보세요.',
            ifStillDifficult: '일반적인 가치부터 연결하세요.',
            example: '저는 늘 "데이터는 거짓말하지 않는다"고 믿어왔고, 숫자로 문제를 해결하는 것을 좋아합니다...'
          }
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 준비 과정',
      subtitle: '관심을 역량으로 발전시킨 과정',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 관심이 생긴 후 이 직무를 향한 발전 과정은?',
          hint: '시간 순서대로 역량 발전 스토리',
          placeholder: '예: 처음에는 독서로 시작했고, 3개월 후 동아리 활동, 6개월 후 개인 프로젝트로 이어졌습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 시간 순서대로 역량 발전 스토리',
            diagnosis: '즉석자가진단: “그 과정의 타임라인은?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '시간 순서는?',
              '각 단계의 활동은?'
            ],
            ifDifficult: '시간 순으로 나열해보세요.',
            ifStillDifficult: '주요 활동 3가지만 적어보세요.',
            example: '처음에는 독서로 시작했고, 3개월 후 동아리 활동, 6개월 후 개인 프로젝트로 이어졌습니다...'
          }
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 가장 많은 시간과 노력을 투자한 구체적 준비는?',
          hint: '가장 열심히 한 활동과 그 성과',
          placeholder: '예: 6개월간 매주 2개씩 브랜드 분석 글을 작성했고, 총 50개 기업을 분석하며 누적 조회수 1만을 달성했습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 가장 열심히 한 활동과 그 성과',
            diagnosis: '즉석자가진단: “노력의 구체적 양은?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '투자한 시간은?',
              '성과는?'
            ],
            ifDifficult: '가장 기억에 남는 활동을 선택하세요.',
            ifStillDifficult: '수치로 표현해보세요.',
            example: '6개월간 매주 2개씩 브랜드 분석 글을 작성했고, 총 50개 기업을 분석하며 누적 조회수 1만을 달성했습니다...'
          }
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 이 준비 과정에서 얻은 가장 중요한 배움이나 깨달음은?',
          hint: '실패와 성공을 통한 성장',
          placeholder: '예: 초반에는 트렌드만 쫓다가 실패했지만, 브랜드 본질을 이해하는 것이 더 중요하다는 것을 깨달았습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 실패와 성공을 통한 성장',
            diagnosis: '즉석자가진단: “그 배움의 예시는?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적 배움은?',
              '적용 사례는?'
            ],
            ifDifficult: '실패 경험을 떠올려보세요.',
            ifStillDifficult: '성공 요인을 분석하세요.',
            example: '초반에는 트렌드만 쫓다가 실패했지만, 브랜드 본질을 이해하는 것이 더 중요하다는 것을 깨달았습니다...'
          }
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 회사 발견',
      subtitle: '왜 하필 이 회사인가',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 이 회사를 어떻게 알게 되었나요?',
          hint: '회사를 발견한 구체적 경로',
          placeholder: '예: 마케팅 컨퍼런스에서 OOO 마케팅 팀장님의 발표를 듣고 감명받았습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 회사를 발견한 구체적 경로',
            diagnosis: '즉석자가진단: “그 경로의 세부사항은?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적 경로는?',
              '언제였나요?'
            ],
            ifDifficult: '회사 발견 시점을 떠올려보세요.',
            ifStillDifficult: '일반적인 경로를 구체화하세요.',
            example: '마케팅 컨퍼런스에서 OOO 마케팅 팀장님의 발표를 듣고 감명받았습니다...'
          }
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 처음 이 회사를 알았을 때 어떤 인상을 받았나요?',
          hint: '첫 인상과 끌린 이유',
          placeholder: '예: "여기는 진짜 데이터로 의사결정하는 회사구나"라는 확신이 들었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 첫 인상과 끌린 이유',
            diagnosis: '즉석자가진단: “왜 그 인상이 강렬했나요?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '첫 인상은?',
              '끌린 이유는?'
            ],
            ifDifficult: '초기 감정을 적어보세요.',
            ifStillDifficult: '회사 특성과 연결하세요.',
            example: '"여기는 진짜 데이터로 의사결정하는 회사구나"라는 확신이 들었습니다...'
          }
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 다른 회사와 비교했을 때 이 회사만의 특별한 점은?',
          hint: '차별화된 강점과 매력 포인트',
          placeholder: '예: 다른 회사들은 마케팅을 비용으로 보지만, OOO는 투자로 보고 과감한 실험을 장려한다는 점이 인상적이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 차별화된 강점과 매력 포인트',
            diagnosis: '즉석자가진단: “비교 예시는?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '다른 회사와 차이점은?',
              '왜 특별한가?'
            ],
            ifDifficult: '경쟁사 비교를 해보세요.',
            ifStillDifficult: '회사 강점 하나를 강조하세요.',
            example: '다른 회사들은 마케팅을 비용으로 보지만, OOO는 투자로 보고 과감한 실험을 장려한다는 점이 인상적이었습니다...'
          }
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 역량 및 기여',
      subtitle: '내가 기여할 수 있는 것',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 입사 후 내가 기여할 수 있는 구체적 역량은?',
          hint: '보유 역량과 증명 가능한 경험',
          placeholder: '예: MZ세대 트렌드 분석과 SNS 콘텐츠 기획 역량으로 2030 고객 확보에 기여하겠습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 보유 역량과 증명 가능한 경험',
            diagnosis: '즉석자가진단: “기여 방식의 예시는?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적 역량은?',
              '기여 영역은?'
            ],
            ifDifficult: '자신의 강점을 회사 니즈와 연결하세요.',
            ifStillDifficult: 'Win-Win 관계를 강조하세요.',
            example: 'MZ세대 트렌드 분석과 SNS 콘텐츠 기획 역량으로 2030 고객 확보에 기여하겠습니다...'
          }
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 그 역량을 보여주는 가장 강력한 경험은?',
          hint: '구체적 프로젝트나 성과',
          placeholder: '예: 인스타그램 계정을 운영하며 3개월 만에 팔로워 1,500명을 모았고, 협찬 제안을 5건 받았습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 구체적 프로젝트나 성과',
            diagnosis: '즉석자가진단: “성과의 구체적 숫자는?”라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '프로젝트 세부사항은?',
              '성과 지표는?'
            ],
            ifDifficult: '강력한 경험 하나를 선택하세요.',
            ifStillDifficult: '수치로 입증하세요.',
            example: '인스타그램 계정을 운영하며 3개월 만에 팔로워 1,500명을 모았고, 협찬 제안을 5건 받았습니다...'
          }
        }
      ]
    }
  ];

  // round2Questions, round3Questions 등 나머지 코드는 변경 없음. 전체 코드를 유지하면서 round1Steps에 guide 추가만 함.
  // (이하 App.js의 나머지 코드 생략, 실제 구현 시 전체 코드에 통합)
};

export default MotivationWorkbook;