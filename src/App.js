import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';

const PersonalityWorkbook = () => {
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
      title: 'STEP 1: 핵심 성격 파악 및 메시지 설정',
      subtitle: '주변 사람들이 나를 어떻게 평가하나요? (3가지)',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 주변 사람들이 나를 어떻게 평가하나요? (3가지)',
          hint: '실제로 들어본 평가만 작성하세요.',
          placeholder: '예: 가족, 친구, 선후배가 자주 하는 말은?',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 가족, 친구, 선후배가 자주 하는 말은?',
          hint: '팀 프로젝트 후 받은 피드백은?',
          placeholder: '예: 나에게 자주 부탁하는 일의 공통점은?',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 나에게 자주 부탁하는 일의 공통점은?',
          hint: '즉석자가진단: “누가, 언제, 어떤 상황에서 그렇게 말했나요?”에 답변 가능한가?',
          placeholder: '예: 가족, 친구, 선후배가 자주 하는 말은?',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 장점의 구체적 발현 양상',
      subtitle: '장점의 구체적 발현 양상',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 장점의 구체적 발현 양상은?',
          hint: '측정 가능하고 검증 가능한 행동 패턴',
          placeholder: '예: 계획적/체계적: 철저한 준비 vs 즉흥 대응 약함',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 구체적 행동 패턴과 발현 양상?',
          hint: '구체적 경험과 행동으로 입증 가능한 패턴',
          placeholder: '예: 꼼꼼함/세밀함: 정확성 높음 vs 처리 속도',
          rows: 3
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 장점 유형과 연관된 단점?',
          hint: '장단점 균형 매칭표 참조',
          placeholder: '예: 추진력/실행력: 빠른 실행 vs 충분한 검토',
          rows: 3
        },
        {
          id: 'q1_2_4',
          label: 'Q1.2.4. ⭐ 위 세 가지를 하나로 연결한 핵심 문장을 작성하세요',
          hint: '진정성 원칙 + 구체성 원칙',
          placeholder: '예: 창의적/혁신적: 새로운 시도 vs 실현 가능성',
          rows: 2
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 장점의 실제 기여와 성과',
      subtitle: '장점의 실제 기여와 성과',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 장점의 실제 기여와 성과를 묘사해주세요',
          hint: '시간, 장소, 상황의 디테일',
          placeholder: '예: 협력적/친화력: 조화 중시 vs 자기 의견',
          rows: 3
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 장점의 실제 기여와 성과에서 어떤 감정이나 생각이 들었나요?',
          hint: '내면의 변화와 깨달음',
          placeholder: '예: 구체적 기여와 성과',
          rows: 3
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 이 경험이 나의 어떤 가치관과 연결되나요?',
          hint: '개인의 신념이나 추구하는 가치',
          placeholder: '예: 실제 기여와 성과',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 단점의 솔직한 인정과 영향',
      subtitle: '단점의 솔직한 인정과 영향',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 단점의 솔직한 인정과 영향은?',
          hint: '시간 순서대로 단점 인정 과정',
          placeholder: '예: 솔직한 인정과 영향',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 가장 많은 시간과 노력을 투자한 구체적 인정은?',
          hint: '가장 열심히 한 활동과 그 영향',
          placeholder: '예: 솔직한 인정과 영향',
          rows: 3
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 이 과정에서 얻은 가장 중요한 배움이나 깨달음은?',
          hint: '실패와 성공을 통한 성장',
          placeholder: '예: 솔직한 인정과 영향',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 단점 극복을 위한 구체적 노력',
      subtitle: '단점 극복을 위한 구체적 노력',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 단점 극복을 위한 구체적 노력은?',
          hint: '극복 발견한 구체적 경로',
          placeholder: '예: 구체적 노력',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 처음 이 극복을 알았을 때 어떤 인상을 받았나요?',
          hint: '첫 인상과 끌린 이유',
          placeholder: '예: 구체적 노력',
          rows: 3
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 다른 극복과 비교했을 때 이 극복만의 특별한 점은?',
          hint: '차별화된 강점과 매력 포인트',
          placeholder: '예: 구체적 노력',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 성장하는 균형감과 시너지',
      subtitle: '성장하는 균형감과 시너지',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 성장하는 균형감과 시너지?',
          hint: '보유 균형과 증명 가능한 경험',
          placeholder: '예: 성장하는 균형감과 시너지',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 그 균형을 보여주는 가장 강력한 경험은?',
          hint: '구체적 프로젝트나 성과',
          placeholder: '예: 성장하는 균형감과 시너지',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. 주변 사람들이 나를 어떻게 평가하나요? (3가지)',
        hint: '그 순간의 디테일한 상황과 감정을 생생하게 표현',
        guide: {
          description: '답변 가이드: 실제로 들어본 평가만 작성하세요.',
          diagnosis: '즉석자가진단: "누가, 언제, 어떤 상황에서 그렇게 말했나요?”에 답변 가능한가?',
          helpQuestions: [
            '가족, 친구, 선후배가 자주 하는 말은?',
            '팀 프로젝트 후 받은 피드백은?',
            '나에게 자주 부탁하는 일의 공통점은?'
          ],
          ifDifficult: '타인 평가를 모르겠을 때 → 참고자료 1장 1.2절 “타인의 시선으로 보기”',
          ifStillDifficult: '평범한 성격이라고 느껴질 때 → 참고자료 1장 “평범한 성격의 재발견법”',
          example: '예: 가족, 친구, 선후배가 자주 하는 말은?'
        },
        placeholder: '예: 가족, 친구, 선후배가 자주 하는 말은?',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 팀 프로젝트 후 받은 피드백은?',
        hint: '변화의 구체적인 before & after 비교',
        guide: {
          description: '답변 가이드: 변화의 구체적인 before & after 비교',
          diagnosis: '즉석자가진단: "구체적으로 뭐가 달라졌어요?"라고 물으면 3가지 이상 답변 가능한가?',
          helpQuestions: [
            '일상의 관심사가 어떻게 바뀌었나요?',
            '시간을 쓰는 방식이 어떻게 변했나요?',
            '미래 계획이 어떻게 수정되었나요?'
          ],
          ifDifficult: '경험정리의 “타인평가” 시트나 STAR 분석에서 반복적으로 나타나는 행동 패턴을 확인하세요.',
          ifStillDifficult: '최소한 검색 기록이 바뀌었을 것입니다. 작은 변화라도 구체적으로 적어보세요.',
          example: '예: 팀 프로젝트 후 받은 피드백은?'
        },
        placeholder: '예: 팀 프로젝트 후 받은 피드백은?',
        rows: 4
      },
      {
        id: 'q2_1_3',
        label: 'Q2.1.3. 나에게 자주 부탁하는 일의 공통점은?',
        hint: '계기의 결정적 중요성을 역설적으로 강조',
        guide: {
          description: '답변 가이드: 계기의 결정적 중요성을 역설적으로 강조',
          diagnosis: '즉석자가진단: "다른 진로를 생각해본 적 있어요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '다른 진로를 고려했었나요?',
            '그 계기가 왜 결정적이었나요?',
            '다른 가능성과 비교했을 때 이 길을 선택한 이유는?'
          ],
          ifDifficult: '이전에 막연히 생각했던 진로를 떠올려보세요.',
          ifStillDifficult: '주변 친구들이 선택한 일반적인 진로를 생각해보세요.',
          example: '예: 나에게 자주 부탁하는 일의 공통점은?'
        },
        placeholder: '예: 나에게 자주 부탁하는 일의 공통점은?',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. 장점의 구체적 발현 양상은?',
        hint: '어려움과 극복 과정을 구체적으로 서술',
        guide: {
          description: '답변 가이드: 어려움과 극복 과정을 구체적으로 서술',
          diagnosis: '즉석자가진단: "왜 그게 어려웠어요?"라고 물으면 상세 설명 가능한가?',
          helpQuestions: [
            '어떤 점이 가장 어려웠나요?',
            '포기하고 싶었던 순간은?',
            '어떻게 극복했나요?'
          ],
          ifDifficult: '실패했던 경험도 의미가 있습니다.',
          ifStillDifficult: '처음 해본 것은 모두 도전입니다.',
          example: '예: 장점의 구체적 발현 양상은?'
        },
        placeholder: '예: 장점의 구체적 발현 양상은?',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 구체적 행동 패턴과 발현 양상?',
        hint: '측정 가능하고 검증 가능한 구체적 성과',
        guide: {
          description: '답변 가이드: 측정 가능하고 검증 가능한 구체적 성과',
          diagnosis: '즉석자가진단: "그 성과를 어떻게 증명할 수 있어요?"',
          helpQuestions: [
            '만든 포트폴리오나 프로젝트가 있나요?',
            '받은 인정이나 피드백은?',
            '수치로 표현할 수 있는 성과는?'
          ],
          ifDifficult: '작은 성과도 의미가 있습니다.',
          ifStillDifficult: '학습 기록이나 노트도 결과물입니다.',
          example: '예: 구체적 행동 패턴과 발현 양상?'
        },
        placeholder: '예: 구체적 행동 패턴과 발현 양상?',
        rows: 4
      },
      {
        id: 'q2_2_3',
        label: 'Q2.2.3. 장점 유형과 연관된 단점?',
        hint: '실패와 극복이 성장의 증거',
        guide: {
          description: '답변 가이드: 실패와 극복이 성장의 증거',
          diagnosis: '즉석자가진단: "그 실패에서 뭘 배웠어요?"',
          helpQuestions: [
            '예상과 다르게 진행된 부분은?',
            '실패의 원인은 무엇이었나요?',
            '그 실패를 어떻게 극복했나요?'
          ],
          ifDifficult: '모든 새로운 도전에는 시행착오가 따릅니다.',
          ifStillDifficult: '작은 실수도 의미가 있습니다.',
          example: '예: 장점 유형과 연관된 단점?'
        },
        placeholder: '예: 장점 유형과 연관된 단점?',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 장점의 실제 기여와 성과를 묘사해주세요',
        hint: '현실적이고 구체적인 업무 일과 묘사',
        guide: {
          description: '답변 가이드: 현실적이고 구체적인 업무 일과 묘사',
          diagnosis: '즉석자가진단: "그 중 가장 어려운 업무는 뭘까요?"',
          helpQuestions: [
            '오전에는 주로 무슨 업무를?',
            '협업은 누구와 어떻게?',
            '가장 시간이 많이 걸리는 업무는?'
          ],
          ifDifficult: '현직자 인터뷰나 브런치 글을 참고하세요.',
          ifStillDifficult: '일반적인 업무 흐름이라도 구체화하세요.',
          example: '예: 장점의 실제 기여와 성과를 묘사해주세요'
        },
        placeholder: '예: 장점의 실제 기여와 성과를 묘사해주세요',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 장점의 실제 기여와 성과에서 어떤 감정이나 생각이 들었나요?',
        hint: '객관적 자기 평가와 발전 가능성',
        guide: {
          description: '답변 가이드: 객관적 자기 평가와 발전 가능성',
          diagnosis: '즉석자가진단: "그 역량을 어떻게 키울 건가요?"',
          helpQuestions: [
            '필수 역량 top 3는?',
            '각각의 현재 수준은?',
            '부족한 부분을 어떻게 채울 것인가?'
          ],
          ifDifficult: '채용공고나 직무 소개서를 참고하세요.',
          ifStillDifficult: '일반적인 역량이라도 솔직하게 평가하세요.',
          example: '예: 장점의 실제 기여와 성과에서 어떤 감정이나 생각이 들었나요?'
        },
        placeholder: '예: 장점의 실제 기여와 성과에서 어떤 감정이나 생각이 들었나요?',
        rows: 4
      },
      {
        id: 'q2_3_3',
        label: 'Q2.3.3. 이 경험이 나의 어떤 가치관과 연결되나요?',
        hint: '우선순위가 명확하고 실행 가능한 계획',
        guide: {
          description: '답변 가이드: 우선순위가 명확하고 실행 가능한 계획',
          diagnosis: '즉석자가진단: "첫 달에는 뭘 할 건가요?"',
          helpQuestions: [
            '우선순위를 정한다면?',
            '각각 언제까지, 어떻게?',
            '이미 시작한 것이 있다면?'
          ],
          ifDifficult: '온라인 강의, 자격증, 독서, 스터디 등을 떠올려보세요.',
          ifStillDifficult: '입사 후 배울 수 있는 것과 지금 준비할 수 있는 것을 구분하세요.',
          example: '예: 이 경험이 나의 어떤 가치관과 연결되나요?'
        },
        placeholder: '예: 이 경험이 나의 어떤 가치관과 연결되나요?',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 단점의 솔직한 인정과 영향은?',
        hint: '구체적인 사실과 날짜, 내용 포함',
        guide: {
          description: '답변 가이드: 구체적인 사실과 날짜, 내용 포함',
          diagnosis: '즉석자가진단: "그게 왜 중요한가요?"',
          helpQuestions: [
            '신규 서비스나 사업 확장은?',
            '조직 문화나 제도의 변화는?',
            '업계에서의 포지션 변화는?'
          ],
          ifDifficult: '회사 홈페이지 뉴스룸을 확인하세요.',
          ifStillDifficult: '기본적인 회사 정보라도 구체화하세요.',
          example: '예: 단점의 솔직한 인정과 영향은?'
        },
        placeholder: '예: 단점의 솔직한 인정과 영향은?',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 가장 많은 시간과 노력을 투자한 구체적 인정은?',
        hint: '다른 회사와 차별화되는 점',
        guide: {
          description: '답변 가이드: 다른 회사와 차별화되는 점',
          diagnosis: '즉석자가진단: "왜 그게 당신에게 중요해요?"',
          helpQuestions: [
            '회사의 핵심 가치는?',
            '업무 방식의 특징은?',
            '조직 문화의 차별점은?'
          ],
          ifDifficult: '회사 홈페이지의 "About Us"를 확인하세요.',
          ifStillDifficult: '일반적인 키워드라도 회사와 연결하세요.',
          example: '예: 가장 많은 시간과 노력을 투자한 구체적 인정은?'
        },
        placeholder: '예: 가장 많은 시간과 노력을 투자한 구체적 인정은?',
        rows: 4
      },
      {
        id: 'q2_4_3',
        label: 'Q2.4.3. 이 과정에서 얻은 가장 중요한 배움이나 깨달음은?',
        hint: '산업 트렌드와 연결한 통찰력 있는 분석',
        guide: {
          description: '답변 가이드: 산업 트렌드와 연결한 통찰력 있는 분석',
          diagnosis: '즉석자가진단: "당신이 어떻게 기여할 수 있을까요?"',
          helpQuestions: [
            '현재 가장 집중하는 이슈는?',
            '향후 성장 동력은?',
            '내가 기여할 수 있는 부분은?'
          ],
          ifDifficult: '산업 리포트, CEO 인터뷰를 찾아보세요.',
          ifStillDifficult: '일반적인 산업 트렌드라도 회사와 연결하세요.',
          example: '예: 이 과정에서 얻은 가장 중요한 배움이나 깨달음은?'
        },
        placeholder: '예: 이 과정에서 얻은 가장 중요한 배움이나 깨달음은?',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. 단점 극복을 위한 구체적 노력은?',
        hint: '구체적인 프로젝트 아이디어와 실행 계획',
        guide: {
          description: '답변 가이드: 구체적인 프로젝트 아이디어와 실행 계획',
          diagnosis: '즉석자가진단: "필요한 리소스는 뭐예요?"',
          helpQuestions: [
            '구체적인 프로젝트명은?',
            '필요한 리소스와 기간은?',
            '예상되는 성과 지표는?'
          ],
          ifDifficult: '현재 회사가 진행 중인 프로젝트를 참고하세요.',
          ifStillDifficult: '간단한 프로젝트부터 시작하세요.',
          example: '예: 단점 극복을 위한 구체적 노력은?'
        },
        placeholder: '예: 단점 극복을 위한 구체적 노력은?',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 처음 이 극복을 알았을 때 어떤 인상을 받았나요?',
        hint: '시간 순서에 따른 단계별 계획',
        guide: {
          description: '답변 가이드: 시간 순서에 따른 단계별 계획',
          diagnosis: '즉석자가진단: "그게 현실적인가요?"',
          helpQuestions: [
            '첫 달: 적응 및 학습',
            '2-3달: 실무 참여',
            '4-6달: 독자적 기여'
          ],
          ifDifficult: '신입사원의 일반적인 성장 경로를 참고하세요.',
          ifStillDifficult: '단계별로 나눠 생각하세요.',
          example: '예: 처음 이 극복을 알았을 때 어떤 인상을 받았나요?'
        },
        placeholder: '예: 처음 이 극복을 알았을 때 어떤 인상을 받았나요?',
        rows: 4
      },
      {
        id: 'q2_5_3',
        label: 'Q2.5.3. 다른 극복과 비교했을 때 이 극복만의 특별한 점은?',
        hint: '회사 문화와 업무 방식에 대한 구체적 적응 전략',
        guide: {
          description: '답변 가이드: 회사 문화와 업무 방식에 대한 구체적 적응 전략',
          diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"',
          helpQuestions: [
            '빠른 의사결정 문화에 적응하려면?',
            '글로벌 협업이 필요하다면?',
            '애자일한 조직 문화에서는?'
          ],
          ifDifficult: '회사의 특징적인 문화를 하나 선택해서 적응 방법을 설명하세요.',
          ifStillDifficult: '일반적인 적응 전략이라도 구체화하세요.',
          example: '예: 다른 극복과 비교했을 때 이 극복만의 특별한 점은?'
        },
        placeholder: '예: 다른 극복과 비교했을 때 이 극복만의 특별한 점은?',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 성장하는 균형감과 시너지?',
        hint: '구체적인 인물과 닮고 싶은 점 명확히',
        guide: {
          description: '답변 가이드: 구체적인 인물과 닮고 싶은 점 명확히',
          diagnosis: '즉석자가진단: "그 사람의 어떤 점을 닮고 싶어요?"',
          helpQuestions: [
            '그 사람의 어떤 점을 닮고 싶나요?',
            '그 사람의 커리어 경로는?',
            '나만의 차별점은?'
          ],
          ifDifficult: '업계 유명 인사를 찾아보세요.',
          ifStillDifficult: '유명하지 않아도 괜찮습니다.',
          example: '예: 성장하는 균형감과 시너지?'
        },
        placeholder: '예: 성장하는 균형감과 시너지?',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 그 균형을 보여주는 가장 강력한 경험은?',
        hint: '차별화된 전문 영역과 구체적 계획',
        guide: {
          description: '답변 가이드: 차별화된 전문 영역과 구체적 계획',
          diagnosis: '즉석자가진단: "왜 그 분야인가요?"',
          helpQuestions: [
            '어떤 세부 분야에 집중할 건가요?',
            '차별화 포인트는?',
            '그를 위한 준비는?'
          ],
          ifDifficult: '현재 트렌드와 자신의 강점을 결합하세요.',
          ifStillDifficult: '기본에 충실하되 한 가지를 깊게 파는 전략도 좋습니다.',
          example: '예: 그 균형을 보여주는 가장 강력한 경험은?'
        },
        placeholder: '예: 그 균형을 보여주는 가장 강력한 경험은?',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 장점에서 단점으로의 자연스러운 전환',
      hint: 'STEP 3의 장점이 STEP 4의 단점으로 어떻게 이어졌나요?',
      placeholder: '예: 장점에서 단점으로의 자연스러운 전환',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_2', 'q1_3_3', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 단점 인정에서 극복 노력으로의 논리적 발전',
      hint: 'STEP 4의 단점이 STEP 5의 노력으로 어떻게 전환되었나요?',
      placeholder: '예: 단점 인정에서 극복 노력으로의 논리적 발전',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_4_3', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 개별 특성에서 통합된 자아상으로의 논리적 연결',
      hint: 'STEP 5의 노력이 STEP 6의 성장으로 어떻게 반영되었나요?',
      placeholder: '예: 개별 특성에서 통합된 자아상으로의 논리적 연결',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_5_2', 'q1_5_3', 'q1_6_1']
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const getProgress = () => {
    if (currentPhase === 'round1') {
      return (currentStep / round1Steps.length) * 30;
    } else if (currentPhase === 'round2') {
      return 30 + (currentStep / selectedSteps.length) * 30;
    } else if (currentPhase === 'round3') {
      return 60 + (currentStep / round3Questions.length) * 40;
    }
    return 0;
  };

  const progress = getProgress();

  const canGoNext = () => {
    if (currentPhase === 'round1' && currentStep === 0) {
      return basicInfo.industry && basicInfo.position && basicInfo.company;
    }
    return currentStepData.questions.every(q => answers[q.id]);
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentPhase('evaluation');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        generateFinalText();
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    }
  };

  const generateFinalText = () => {
    let text = `성격의 장단점: ${basicInfo.company || '회사'} - ${basicInfo.position || '직무'}\n\n`;

    round1Steps.slice(1).forEach(step => {
      text += `${step.title}\n`;
      step.questions.forEach(q => {
        text += `${q.label}: ${answers[q.id] || '(미작성)'}\n\n`;
      });
    });

    selectedSteps.forEach(stepId => {
      text += `${round1Steps[stepId].title} - 심화\n`;
      round2Questions[stepId].forEach(q => {
        text += `${q.label}: ${answers[q.id] || '(미작성)'}\n\n`;
      });
    });

    text += '연결 및 완성\n';
    round3Questions.forEach(q => {
      text += `${q.label}: ${answers[q.id] || '(미작성)'}\n\n`;
    });

    setFinalText(text);
  };

  const getRawAnswersText = () => {
    let text = '';
    Object.entries(answers).forEach(([id, answer]) => {
      text += `${id}: ${answer}\n\n`;
    });
    return text;
  };

  const downloadFinalText = () => {
    const blob = new Blob([finalText], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_성격의 장단점.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const currentStepData = currentPhase === 'round1' 
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { 
        title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`,
        questions: round2Questions[selectedSteps[currentStep]]
      }
    : {
        title: '3라운드: 연결 및 완성',
        questions: [round3Questions[currentStep]]
      };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">워크북 잠금 해제</h2>
            <p className="text-gray-600">비밀번호를 입력하세요 (힌트: career2025)</p>
          </div>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4"
            placeholder="비밀번호 입력"
          />
          
          {showError && (
            <p className="text-red-500 text-sm mb-4 text-center">잘못된 비밀번호입니다.</p>
          )}
          
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
          >
            잠금 해제
          </button>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              질문에 답하며 완성하는 성격의 장단점 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">
              체계적 접근 → 구체적 답변 → 완성도 높은 성격의 장단점
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">대원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>허위 성격 특성은 금물</strong></li>
                <li><strong>진정성 체크 필수:</strong> 면접에서 일관성 있게 설명 가능한 성격만 표현</li>
                <li><strong>구체적 발현 필수:</strong> 추상적 성격 표현보다 구체적 행동 패턴 중심</li>
                <li><strong>솔직함 필수:</strong> 가짜 단점보다 진정성 있는 성격이 100배 나음</li>
                <li><strong>검증 가능한 내용:</strong> 가족·친구들도 인정할 수 있는 내용만 사용</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">워크북 시스템 개요</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 기본 성격의 장단점 수립</h3>
                  <p className="text-sm text-gray-700">6단계 핵심 질문에 답변하여 전체 성격 구조 확보</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 구체화 및 보강</h3>
                  <p className="text-sm text-gray-700">선택한 단계의 세부 질문으로 구체화</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">1-2라운드 답변을 연결하여 자연스러운 완성</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">성격의 장단점 핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성 원칙:</strong> 실제 성격과 일치하는 솔직한 자기 표현</li>
                <li><strong>구체성 원칙:</strong> 추상적 성격 표현보다 구체적 행동 패턴과 발현 양상</li>
                <li><strong>자기인식 원칙:</strong> 객관적이고 균형잡힌 자기 이해</li>
                <li><strong>성장성 원칙:</strong> 지속적 발전 의지와 구체적 개선 노력</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성 내용은 자동 저장되지 않습니다. 마지막에 워드 파일(.doc)로 다운로드 필수!
              </p>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg"
            >
              1라운드 시작하기 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              1라운드 완료! 🎉
            </h2>
            <p className="text-center text-gray-600 mb-8">
              부족하다고 느끼는 STEP을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>

            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map(step => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);
                
                return (
                  <div 
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>내 답변:</strong> {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {answers[step.questions[0].id]?.length > 100 && '...'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStepSelection(stepId)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isSelected 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isSelected ? '✓ 선택됨' : '심화 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 STEP을 자유롭게 선택하세요. (1개 이상)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!selectedSteps.length}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                성격의 장단점 완성! 🎉
              </h2>
              <p className="text-gray-600">
                아래 내용을 확인하고 자유롭게 수정하세요
              </p>
            </div>

            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">
                    반드시 다운로드하세요!
                  </p>
                  <p className="text-sm text-red-800 leading-relaxed">
                    지금까지 작성한 모든 내용은 브라우저에만 임시 저장되어 있습니다. 
                    페이지를 새로고침하거나 닫으면 <strong>모든 내용이 즉시 삭제</strong>됩니다.
                    <br />
                    💾 <strong>지금 바로 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  완성된 성격의 장단점 (수정 가능)
                </h3>
                <button
                  onClick={() => setShowRawAnswers(!showRawAnswers)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기'}
                </button>
              </div>
              
              <textarea
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed"
              />
            </div>

            {showRawAnswers && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📋 원본 답변 참고</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {getRawAnswersText()}
                </pre>
              </div>
            )}

            <button
              onClick={downloadFinalText}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4"
            >
              <Download className="w-6 h-6" />
              워드 파일로 다운로드 (.doc)
            </button>

            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">
                  ✅ 다운로드 완료!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_성격의 장단점.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word나 한글(HWP)에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            질문에 답하며 완성하는 성격의 장단점 워크북
          </h1>
          <p className="text-gray-600">
            체계적 접근 → 구체적 답변 → 완성도 높은 성격의 장단점
          </p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} - {currentStepData.title}
              </span>
              <span>전체 진행률: {Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.subtitle && (
            <p className="text-gray-600 mb-6">{currentStepData.subtitle}</p>
          )}

          {currentStep === 0 && currentPhase === 'round1' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 산업
                </label>
                <input
                  type="text"
                  value={basicInfo.industry}
                  onChange={(e) => handleBasicInfoChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 전기차/배터리 산업"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.position}
                  onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 자율주행 및 전기차 SW 개발"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 회사명
                </label>
                <input
                  type="text"
                  value={basicInfo.company}
                  onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자, 현대자동차 등"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentStepData.questions.map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">
                      {q.label}
                    </label>
                    {q.guide && (
                      <button
                        onClick={() => toggleGuide(q.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'}
                      </button>
                    )}
                  </div>
                  
                  {q.hint && (
                    <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>
                  )}
                  
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">📚 참고: 이전 답변</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const refQuestion = [...round1Steps.flatMap(s => s.questions || [])].find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          return (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQuestion.label}</p>
                              <p className="text-gray-600 italic">{answers[refId]?.substring(0, 150)}{answers[refId]?.length > 150 ? '...' : ''}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      </div>
                      
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => (
                              <li key={i}>• {hq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {q.guide.ifDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💭 답변하기 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>
                        </div>
                      )}
                      
                      {q.guide.ifStillDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💡 구체화 도움 질문으로도 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>
                        </div>
                      )}
                      
                      {q.guide.example && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">✏️ 답변 작성 예시:</p>
                          <p className="text-sm text-blue-800 italic bg-white p-2 rounded">{q.guide.example}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={q.rows || 3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={q.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={goToPrevStep}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>
            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityWorkbook;