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
      subtitle: '타인의 평가와 나만의 핵심 특성 이해',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 주변 사람들이 나를 어떻게 평가하나요? (3가지)',
          hint: '실제로 들어본 평가만 작성하세요',
          guide: {
            description: '답변 가이드: 실제로 들어본 평가만 작성하세요',
            diagnosis: '즉석자가진단: "누가, 언제, 어떤 상황에서 그렇게 말했나요?"에 답변 가능한가?',
            helpQuestions: [
              '가족, 친구, 선후배가 자주 하는 말은?',
              '팀 프로젝트 후 받은 피드백은?',
              '나에게 자주 부탁하는 일의 공통점은?'
            ],
            ifDifficult: '최근 3개월 내 들었던 칭찬이나 지적을 떠올려보세요.',
            ifStillDifficult: '가족이나 가장 친한 친구 1명에게 지금 바로 물어보세요.'
          },
          placeholder: '예: 1. "계획적이고 체계적이다" - 팀 프로젝트에서 항상 일정 관리를 맡았습니다.\n2. "경청을 잘한다" - 친구들이 고민 상담을 자주 요청합니다.\n3. "꼼꼼하다" - 과제나 보고서 최종 검토를 늘 부탁받습니다.',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 그 중 가장 나를 잘 표현하는 특성은?',
          hint: '가장 자주 듣고, 본인도 인정하는 특성을 선택하세요',
          guide: {
            description: '답변 가이드: 가장 자주 듣고, 본인도 인정하는 특성을 선택하세요',
            diagnosis: '즉석자가진단: "왜 그게 가장 나를 잘 표현한다고 생각하나요?"에 답변 가능한가?',
            helpQuestions: [
              '어떤 평가를 들을 때 가장 공감되나요?',
              '일상에서 가장 자주 나타나는 특성은?',
              '스스로도 인정하는 대표 성격은?'
            ],
            ifDifficult: '3가지 중 가장 많은 사람이 언급한 것을 선택하세요.',
            ifStillDifficult: '지난 1주일 동안 본인의 행동을 되돌아보고, 가장 많이 반복된 패턴과 연결되는 특성을 선택하세요.'
          },
          placeholder: '예: "계획적이고 체계적인 성격"이 저를 가장 잘 표현합니다. 일상생활부터 학업, 프로젝트까지 모든 일에 계획을 세우고 체크리스트를 만드는 것이 습관화되어 있기 때문입니다.',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 그 성격이 형성된 배경이나 계기는?',
          hint: '구체적 경험이나 환경을 설명하세요',
          guide: {
            description: '답변 가이드: 구체적 경험이나 환경을 설명하세요',
            diagnosis: '즉석자가진단: "그때 무슨 일이 있었나요?"에 구체적으로 답변 가능한가?',
            helpQuestions: [
              '언제부터 이런 성격이 되었나요?',
              '특별한 사건이나 경험이 있었나요?',
              '가족이나 환경의 영향이 있었나요?'
            ],
            ifDifficult: '성격이 강화된 특정 시기나 상황을 떠올려보세요.',
            ifStillDifficult: '이 성격 때문에 성공했던 첫 경험을 떠올려보세요.'
          },
          placeholder: '예: 고등학교 때 학업과 동아리 활동을 병행하면서 시간 관리의 중요성을 깨달았습니다. 우선순위를 정하고 일정을 관리하니 둘 다 좋은 성과를 낼 수 있었고, 이후 자연스럽게 모든 일에 계획을 세우는 습관이 생겼습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 장점의 구체적 발현 양상',
      subtitle: '관찰 가능한 행동 패턴과 일상 속 발현',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 이 장점이 일상에서 어떻게 나타나나요?',
          hint: '구체적이고 관찰 가능한 행동 3가지를 작성하세요',
          guide: {
            description: '답변 가이드: 즉시 활용 가능한 역량 중심으로 구체적 수준 명시',
            diagnosis: '즉석자가진단: "구체적으로 어떤 행동을 하나요?"에 답변 가능한가?',
            helpQuestions: [
              '매일 반복하는 행동 패턴은?',
              '이 성격 때문에 하게 되는 습관은?',
              '남들과 다른 나만의 루틴은?'
            ],
            ifDifficult: '오늘 하루 일과를 떠올려보고, 이 성격과 연결되는 구체적 행동을 찾아보세요.',
            ifStillDifficult: '이 성격을 가진 사람이 일반적으로 하는 행동을 먼저 떠올린 후, 본인도 그런 행동을 하는지 확인해보세요.'
          },
          placeholder: '예: 1. 매일 아침 To-do list를 작성하고 우선순위를 정합니다.\n2. 프로젝트 시작 전 전체 일정표와 마일스톤을 먼저 설정합니다.\n3. 약속 시간 10분 전에는 항상 도착하도록 역산해서 출발합니다.',
          rows: 4
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 학업이나 프로젝트에서는 어떻게 발현되나요?',
          hint: '팀 활동이나 과제 수행 시 구체적 사례',
          guide: {
            description: '답변 가이드: 팀 활동이나 과제 수행 시 구체적 사례를 작성하세요',
            diagnosis: '즉석자가진단: "그래서 어떤 결과가 나왔나요?"에 답변 가능한가?',
            helpQuestions: [
              '팀 프로젝트에서 주로 맡는 역할은?',
              '과제나 시험 준비 방식의 특징은?',
              '이 성격 덕분에 얻은 성과는?'
            ],
            ifDifficult: '최근 참여한 팀 프로젝트나 중요한 과제를 하나 떠올리고, 그 과정에서 이 성격이 어떻게 도움이 되었는지 구체적으로 설명하세요.',
            ifStillDifficult: '이 성격이 없었다면 어떤 어려움이 있었을지 역으로 생각해보세요.'
          },
          placeholder: '예: 팀 프로젝트에서 자연스럽게 일정 관리자 역할을 맡게 됩니다. 간트차트를 만들어 공유하고, 주간 진행상황을 체크하며, 마감일 3일 전 최종 점검 시간을 확보합니다. 덕분에 제가 참여한 프로젝트는 항상 기한 내 완성되어 A 이상의 성적을 받았습니다.',
          rows: 4
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 이 장점이 남들과 차별화되는 점은?',
          hint: '정도나 방식의 독특함을 설명하세요',
          guide: {
            description: '답변 가이드: 정도나 방식의 독특함을 설명하세요',
            diagnosis: '즉석자가진단: "다른 사람들과 뭐가 다른가요?"에 구체적으로 답변 가능한가?',
            helpQuestions: [
              '같은 성격이라도 나만의 특별한 방식은?',
              '남들보다 더 철저하거나 독특한 부분은?',
              '이 성격의 강도나 지속성은?'
            ],
            ifDifficult: '비슷한 성격을 가진 친구와 비교해보세요.',
            ifStillDifficult: '이 성격과 관련해서 받은 특별한 칭찬이나 놀란 반응을 떠올려보세요.'
          },
          placeholder: '예: 단순히 계획만 세우는 것이 아니라, 실행 과정을 추적하고 개선점을 찾습니다. 프로젝트 후에는 항상 회고 노트를 작성해 다음에는 더 효율적으로 진행할 수 있도록 개선안을 도출합니다. 이런 체계적 피드백 시스템까지 갖춘 점이 차별화 포인트입니다.',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 장점의 실제 기여와 성과',
      subtitle: 'STAR 기법으로 구체적 성과 증명',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 이 장점으로 만든 구체적 성과는? (STAR 기법)',
          hint: '하나의 대표 경험을 STAR로 상세 설명하세요',
          guide: {
            description: '답변 가이드: STAR(상황-과제-행동-결과) 구조로 구체적인 경험 서술',
            diagnosis: '즉석자가진단: "그 상황을 자세히 설명해주세요"라고 하면 3분간 설명 가능한가?',
            helpQuestions: [
              '이 성격 덕분에 성공한 가장 대표적 경험은?',
              '구체적으로 어떤 문제를 해결했나요?',
              '측정 가능한 성과나 결과는?'
            ],
            ifDifficult: '최근 1년 내 가장 뿌듯했던 성과를 떠올리고, 그 과정에서 이 성격이 어떻게 도움이 되었는지 단계별로 정리해보세요.',
            ifStillDifficult: '작은 성과라도 괜찮습니다. STAR로 구체화하면 의미 있습니다.'
          },
          placeholder: '예: S: 대학 축제 기획단에서 20개 부스 운영 총괄을 맡았습니다.\nT: 3주 안에 모든 준비를 완료해야 했습니다.\nA: 부스별 준비 체크리스트를 만들고, 주 2회 진행 상황을 점검했습니다.\nR: 모든 부스가 차질 없이 운영되었고, "역대 가장 체계적인 축제"라는 평가를 받았습니다.',
          rows: 5
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 타인들은 이 장점을 어떻게 평가했나요?',
          hint: '구체적인 피드백이나 평가를 작성하세요',
          guide: {
            description: '답변 가이드: 구체적인 피드백이나 평가를 작성하세요',
            diagnosis: '즉석자가진단: "정확히 뭐라고 하셨나요?"에 답변 가능한가?',
            helpQuestions: [
              '교수님이나 선배의 구체적 피드백은?',
              '팀원들의 반응이나 평가는?',
              '이 성격으로 받은 칭찬은?'
            ],
            ifDifficult: '직접적인 말이 기억나지 않으면, 행동으로 보여준 신뢰를 떠올려보세요.',
            ifStillDifficult: '이 성격과 관련해서 자주 맡게 되는 역할이나 부탁받는 일을 생각해보세요.'
          },
          placeholder: '예: 지도교수님께서 "너와 일하면 마음이 놓인다"고 말씀하셨습니다. 팀원들은 "덕분에 각자 역할에만 집중할 수 있었다"고 평가했습니다. 후배들은 "선배님 일하는 방식을 배우고 싶다"며 조언을 구하기도 했습니다.',
          rows: 3
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 이 경험에서 배운 점은?',
          hint: '성찰과 성장 포인트를 작성하세요',
          guide: {
            description: '답변 가이드: 성찰과 성장 포인트를 작성하세요',
            diagnosis: '즉석자가진단: "그래서 지금은 어떻게 하고 있나요?"에 답변 가능한가?',
            helpQuestions: [
              '성공 요인은 무엇이었나요?',
              '더 개선할 수 있는 부분은?',
              '이 경험이 이후에 어떻게 도움이 되었나요?'
            ],
            ifDifficult: '"잘한 점"과 "아쉬운 점"을 각각 하나씩 정리하고, 이후 어떻게 발전시켰는지 설명하세요.',
            ifStillDifficult: '이 경험 이후 비슷한 상황에서 달라진 점을 찾아보세요.'
          },
          placeholder: '예: 체계적 계획도 중요하지만, 유연성도 필요하다는 것을 배웠습니다. 예상치 못한 변수에 대응할 수 있는 여유 시간을 확보하는 것이 중요하며, 이후 프로젝트에서는 전체 일정의 20%를 버퍼로 두는 원칙을 세웠습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 단점의 솔직한 인정과 영향',
      subtitle: '진짜 단점과 그로 인한 어려움',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 장점의 이면이나 과도함으로 나타나는 단점은?',
          hint: '진짜 개선이 필요한 부분을 솔직하게 작성하세요',
          guide: {
            description: '답변 가이드: 진짜 개선이 필요한 부분을 솔직하게 작성하세요',
            diagnosis: '즉석자가진단: "그래서 어떤 문제가 생겼나요?"에 구체적 사례로 답변 가능한가?',
            helpQuestions: [
              '이 장점 때문에 오히려 문제가 된 경우는?',
              '과도하게 발현될 때의 부작용은?',
              '타인이 지적한 개선점은?'
            ],
            ifDifficult: '장점을 극단적으로 발휘했을 때를 상상해보세요.',
            ifStillDifficult: '주변 사람들이 가끔 답답해하거나 불편해하는 부분을 떠올려보세요.'
          },
          placeholder: '예: 계획적인 성격이 과도하면 유연성이 부족해집니다. 예상치 못한 변수나 갑작스러운 계획 변경에 스트레스를 받고, 즉흥적인 아이디어 회의나 브레인스토밍에서 적응하는 데 시간이 걸립니다.',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 이 단점으로 인한 구체적 어려움은?',
          hint: '실제 겪은 어려움이나 실패 경험을 작성하세요',
          guide: {
            description: '답변 가이드: 실제 겪은 어려움이나 실패 경험을 작성하세요',
            diagnosis: '즉석자가진단: "그때 기분이 어땠나요?"라고 물으면 당시 감정을 설명할 수 있는가?',
            helpQuestions: [
              '단점 때문에 실패한 경험은?',
              '팀에 미친 부정적 영향은?',
              '개인적으로 느낀 한계는?'
            ],
            ifDifficult: '"이 단점 때문에 ~하지 못했다"의 형식으로 구체적 상황을 떠올려보세요.',
            ifStillDifficult: '이 단점을 개선하고 싶다고 느낀 순간을 떠올려보세요.'
          },
          placeholder: '예: 스타트업 인턴십에서 빠르게 변하는 업무 환경에 적응하기 어려웠습니다. 매일 우선순위가 바뀌는 상황에서 기존 계획을 고수하려다 팀의 속도를 따라가지 못했고, "좀 더 유연하게 대응했으면 좋겠다"는 피드백을 받았습니다.',
          rows: 4
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 이 단점을 인정하게 된 계기는?',
          hint: '자기 인식의 전환점을 설명하세요',
          guide: {
            description: '답변 가이드: 자기 인식의 전환점을 설명하세요',
            diagnosis: '즉석자가진단: "그 전과 후가 어떻게 달라졌나요?"에 답변 가능한가?',
            helpQuestions: [
              '단점을 직면하게 된 사건은?',
              '누구의 피드백이 결정적이었나요?',
              '변화의 필요성을 느낀 순간은?'
            ],
            ifDifficult: '타인의 직접적 지적이나 피드백을 받은 순간, 또는 스스로 한계를 느낀 순간을 떠올려보세요.',
            ifStillDifficult: '이 단점과 관련해서 가장 최근에 "앞으로는 다르게 해야겠다"고 생각한 순간을 찾아보세요.'
          },
          placeholder: '예: 인턴십 멘토님께서 "계획은 방향이지 족쇄가 아니다"라고 조언해주신 것이 전환점이었습니다. 완벽한 계획보다 상황에 맞는 빠른 대응이 더 중요한 경우가 많다는 것을 깨달았고, 이후 의식적으로 유연성을 기르려고 노력하기 시작했습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 단점 극복을 위한 구체적 노력',
      subtitle: '실행 중인 개선 활동과 변화',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 단점 개선을 위한 구체적 노력은?',
          hint: '실제 실행 중인 개선 활동을 구체적으로 작성하세요',
          guide: {
            description: '답변 가이드: 실제 실행 중인 개선 활동을 구체적으로 작성하세요',
            diagnosis: '즉석자가진단: "오늘은 뭘 했나요?"라고 물으면 구체적 행동을 답할 수 있는가?',
            helpQuestions: [
              '매일/매주 실천하는 것은?',
              '새롭게 시작한 활동이나 습관은?',
              '의식적으로 바꾸려는 행동은?'
            ],
            ifDifficult: '작은 노력이라도 괜찮습니다. 일상의 작은 변화도 의미 있습니다.',
            ifStillDifficult: '지금 당장 시작할 수 있는 가장 쉬운 개선 방법을 하나 정하고, "오늘부터 시작하겠다"고 작성하세요.'
          },
          placeholder: '예: \'플랜 B 습관\'을 기르고 있습니다. 모든 계획에 대안을 미리 준비하고, 주 1회는 계획 없는 \'즉흥 데이\'를 만들어 변화에 적응하는 연습을 합니다. 또한 브레인스토밍 시간에는 타이머를 설정하고 떠오르는 대로 아이디어를 내는 훈련을 하고 있습니다.',
          rows: 4
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 개선 노력의 구체적 성과나 변화는?',
          hint: '측정 가능하거나 관찰 가능한 변화를 작성하세요',
          guide: {
            description: '답변 가이드: 측정 가능하거나 관찰 가능한 변화를 작성하세요',
            diagnosis: '즉석자가진단: "어떻게 변화를 확인했나요?"에 답변 가능한가?',
            helpQuestions: [
              '이전과 비교해 달라진 점은?',
              '주변의 피드백이 바뀌었나요?',
              '스스로 느끼는 변화는?'
            ],
            ifDifficult: '작은 변화라도 찾아보세요.',
            ifStillDifficult: '개선 노력을 시작하기 전과 지금을 비교해보세요.'
          },
          placeholder: '예: 3개월 전보다 예상치 못한 상황에서도 침착하게 대응할 수 있게 되었습니다. 최근 프로젝트에서 갑작스러운 요구사항 변경에도 유연하게 대처하여, 팀장님으로부터 "많이 유연해졌다"는 긍정적 피드백을 받았습니다.',
          rows: 3
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 앞으로의 지속적 개선 계획은?',
          hint: '장기적이고 구체적인 발전 계획을 작성하세요',
          guide: {
            description: '답변 가이드: 장기적이고 구체적인 발전 계획을 작성하세요',
            diagnosis: '즉석자가진단: "1년 후에는 어떻게 되어 있을까요?"에 답변 가능한가?',
            helpQuestions: [
              '다음 단계의 개선 목표는?',
              '어떤 새로운 방법을 시도할 예정인가요?',
              '롤모델이나 벤치마킹 대상은?'
            ],
            ifDifficult: '현재 노력을 꾸준히 지속하는 것도 좋은 계획입니다.',
            ifStillDifficult: '이 단점이 완전히 개선된 이상적인 모습을 상상하고, 그 모습에 도달하기 위한 단계를 나눠보세요.'
          },
          placeholder: '예: 애자일 방법론을 공부하여 변화 대응력을 체계적으로 기르려 합니다. 관련 서적을 읽고 온라인 강의를 수강하며, 개인 프로젝트에 적용해볼 계획입니다. 1년 내에 계획성과 유연성의 균형을 갖춘 인재로 성장하는 것이 목표입니다.',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 성장하는 균형감과 시너지',
      subtitle: '통합된 자아상과 직무 연결',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 장점과 단점이 만드는 나만의 개성은?',
          hint: '장단점을 통합한 독특한 매력을 작성하세요',
          guide: {
            description: '답변 가이드: 장단점을 통합한 독특한 매력을 작성하세요',
            diagnosis: '즉석자가진단: "한 마디로 어떤 사람이에요?"에 30초 내 답변 가능한가?',
            helpQuestions: [
              '장단점을 합치면 어떤 인물상인가요?',
              '나만의 독특한 균형점은?',
              '함께 일하기에 어떤 매력이 있나요?'
            ],
            ifDifficult: '"~하지만 ~한 사람"의 구조로 생각해보세요.',
            ifStillDifficult: '친구들이 나를 소개할 때 자주 사용하는 표현을 떠올려보세요.'
          },
          placeholder: '예: 철저한 계획성과 유연성 사이에서 균형을 찾아가는 사람입니다. 기본적으로는 체계적으로 일하되, 상황에 따라 유연하게 대응하려 노력하며, 이런 균형 감각이 안정성과 혁신을 동시에 추구하는 조직에 잘 맞습니다.',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 이런 성격이 직무 수행에 어떻게 도움될까요?',
          hint: '지원 직무와 성격의 시너지를 설명하세요',
          guide: {
            description: '답변 가이드: 지원 직무와 성격의 시너지를 설명하세요',
            diagnosis: '즉석자가진단: "왜 이 직무에 적합한가요?"에 논리적으로 답변 가능한가?',
            helpQuestions: [
              '이 직무에 필요한 성격적 요소는?',
              '내 성격이 업무에 주는 장점은?',
              '단점 개선이 직무에 미치는 긍정적 영향은?'
            ],
            ifDifficult: '지원 직무의 핵심 역량과 본인 성격의 교집합을 찾아보세요.',
            ifStillDifficult: '이 직무를 잘하는 사람의 특징을 떠올리고, 본인 성격과 비교해보세요.'
          },
          placeholder: '예: 마케팅 직무는 체계적인 캠페인 기획과 트렌드에 따른 유연한 대응이 모두 필요합니다. 저의 계획적 성격은 장기 캠페인 설계에, 개선 중인 유연성은 실시간 마케팅에 도움이 될 것입니다. 특히 데이터 기반의 체계적 접근과 창의적 발상의 균형이 강점이 될 것입니다.',
          rows: 4
        },
        {
          id: 'q1_6_3',
          label: 'Q1.6.3. 앞으로 어떤 동료/직원이 되고 싶나요?',
          hint: '미래 지향적이고 구체적인 성장 비전을 작성하세요',
          guide: {
            description: '답변 가이드: 미래 지향적이고 구체적인 성장 비전을 작성하세요',
            diagnosis: '즉석자가진단: "그렇게 되기 위해 뭘 할 건가요?"에 답변 가능한가?',
            helpQuestions: [
              '1년 후 나는 어떤 평가를 받고 싶나요?',
              '팀에 어떤 기여를 하고 싶나요?',
              '롤모델로 삼고 싶은 선배의 모습은?'
            ],
            ifDifficult: '"신뢰받는", "도움이 되는", "함께 일하고 싶은" 등의 키워드를 하나 선택하고, 그것을 구체화해보세요.',
            ifStillDifficult: '지금까지 만난 가장 좋은 팀원이나 선배를 떠올리고, 그 사람의 어떤 점을 본받고 싶은지 생각해보세요.'
          },
          placeholder: '예: 체계적이면서도 유연한, \'믿고 맡길 수 있는 동료\'가 되고 싶습니다. 기본기에 충실하면서도 새로운 시도를 두려워하지 않고, 팀원들과 적극적으로 소통하며 함께 성장하는 사람이 되겠습니다.',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. 상황별로 다르게 나타나는 성격은?',
        hint: '환경에 따른 성격 변화',
        guide: {
          description: '답변 가이드: 환경에 따른 성격 변화를 설명하세요',
          diagnosis: '즉석자가진단: 다양한 상황을 구체적으로 설명할 수 있나요?',
          helpQuestions: [
            '스트레스 상황에서는?',
            '편안한 상황에서는?',
            '처음 만나는 사람과는?'
          ],
          ifDifficult: '최근 경험한 다양한 상황을 떠올려보세요.',
          ifStillDifficult: '친한 사람과 낯선 사람 앞에서의 차이를 생각해보세요.'
        },
        placeholder: '예: 스트레스 상황에서는 더욱 체계적으로 접근하려 하고, 편안한 상황에서는 좀 더 유연합니다.',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 성격 관련 MBTI나 강점 검사 결과는?',
        hint: '객관적 검사 결과와 본인 생각 비교',
        guide: {
          description: '답변 가이드: 객관적 검사 결과와 본인 생각을 비교하세요',
          diagnosis: '즉석자가진단: 검사 결과에 공감하나요?',
          helpQuestions: [
            '검사 결과는 무엇인가요?',
            '일치하는 부분은?',
            '다른 부분은?'
          ],
          ifDifficult: '온라인에서 무료 검사를 해보세요.',
          ifStillDifficult: '검사 없이도 자신의 성격 특성을 객관적으로 설명할 수 있습니다.'
        },
        placeholder: '예: MBTI ISTJ로 체계적이고 책임감 있다는 결과가 나왔는데, 대부분 맞지만 최근에는 유연해지려 노력 중입니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. 장점이 가장 빛났던 순간은?',
        hint: '최고의 순간 상세 묘사',
        guide: {
          description: '답변 가이드: 최고의 순간을 상세히 묘사하세요',
          diagnosis: '즉석자가진단: 그 순간을 생생하게 설명할 수 있나요?',
          helpQuestions: [
            '언제, 어디서 일어난 일인가요?',
            '어떤 감정을 느꼈나요?',
            '주변 반응은 어땠나요?'
          ],
          ifDifficult: '가장 자랑스러웠던 순간을 떠올려보세요.',
          ifStillDifficult: '작은 성공도 의미 있습니다.'
        },
        placeholder: '예: 팀 프로젝트 발표 후 교수님께서 "가장 완성도 높은 프로젝트"라고 칭찬하셨을 때입니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 이 장점을 더 발전시키는 방법은?',
        hint: '장점 극대화 전략',
        guide: {
          description: '답변 가이드: 장점을 더 발전시킬 구체적 방법',
          diagnosis: '즉석자가진단: 실행 가능한 계획인가요?',
          helpQuestions: [
            '현재 수준은?',
            '목표 수준은?',
            '어떤 방법으로?'
          ],
          ifDifficult: '관련 도서나 강의를 찾아보세요.',
          ifStillDifficult: '롤모델을 정하고 벤치마킹하세요.'
        },
        placeholder: '예: 프로젝트 관리 관련 자격증을 취득하고, 더 큰 규모의 프로젝트를 경험하려 합니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 성과의 장기적 영향은?',
        hint: '지속적 파급 효과',
        guide: {
          description: '답변 가이드: 성과가 미친 장기적 영향',
          diagnosis: '즉석자가진단: 그 이후로도 영향이 있었나요?',
          helpQuestions: [
            '즉각적 성과는?',
            '3개월 후에는?',
            '현재까지 영향은?'
          ],
          ifDifficult: '시간의 흐름에 따라 정리해보세요.',
          ifStillDifficult: '작은 변화도 의미 있습니다.'
        },
        placeholder: '예: 그 이후로 후배들이 저의 방법을 따라하기 시작했고, 팀 전체의 효율성이 높아졌습니다.',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 나 없었다면 어떻게 됐을까?',
        hint: '본인의 독특한 기여 강조',
        guide: {
          description: '답변 가이드: 본인만의 독특한 기여',
          diagnosis: '즉석자가진단: 차별화된 기여가 명확한가요?',
          helpQuestions: [
            '대체 불가능했던 부분은?',
            '나만의 접근 방식은?',
            '팀에 미친 영향은?'
          ],
          ifDifficult: '다른 사람이었다면 어땠을지 상상해보세요.',
          ifStillDifficult: '팀원들의 반응을 떠올려보세요.'
        },
        placeholder: '예: 저의 체계적 접근이 없었다면 프로젝트가 중간에 표류했을 가능성이 높습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 단점의 근본 원인은?',
        hint: '깊은 자기 성찰',
        guide: {
          description: '답변 가이드: 단점의 근본 원인 분석',
          diagnosis: '즉석자가진단: 왜 그런 단점이 생겼는지 이해하나요?',
          helpQuestions: [
            '성격적 원인은?',
            '환경적 요인은?',
            '습관적 패턴은?'
          ],
          ifDifficult: '어린 시절이나 과거 경험을 떠올려보세요.',
          ifStillDifficult: '가장 최근에 단점이 드러난 순간을 분석해보세요.'
        },
        placeholder: '예: 완벽주의 성향과 실패에 대한 두려움이 과도한 계획 집착으로 이어진 것 같습니다.',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 단점이 장점이 될 수 있는 상황은?',
        hint: '역발상적 접근',
        guide: {
          description: '답변 가이드: 단점이 도움이 되는 상황',
          diagnosis: '즉석자가진단: 긍정적으로 활용할 방법이 있나요?',
          helpQuestions: [
            '어떤 상황에서는 도움이 되나요?',
            '적절한 활용 방법은?',
            '균형점은?'
          ],
          ifDifficult: '단점의 반대편을 생각해보세요.',
          ifStillDifficult: '같은 단점을 가진 성공한 사람을 찾아보세요.'
        },
        placeholder: '예: 계획에 집착하는 성향도 위기 상황에서는 침착한 대응으로 이어질 수 있습니다.',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. 롤모델의 개선 방법은?',
        hint: '벤치마킹 전략',
        guide: {
          description: '답변 가이드: 롤모델의 방법 벤치마킹',
          diagnosis: '즉석자가진단: 구체적인 롤모델이 있나요?',
          helpQuestions: [
            '누구를 롤모델로 삼나요?',
            '그 사람의 방법은?',
            '적용 가능한 부분은?'
          ],
          ifDifficult: '존경하는 사람을 떠올려보세요.',
          ifStillDifficult: '책이나 영상에서 본 사례도 좋습니다.'
        },
        placeholder: '예: OO 선배님은 계획과 유연성의 균형을 잘 맞추시는데, 항상 플랜 B를 준비하신다고 합니다.',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 개선 과정의 어려움과 극복은?',
        hint: '현실적 어려움 인정',
        guide: {
          description: '답변 가이드: 개선 과정의 어려움과 극복 방법',
          diagnosis: '즉석자가진단: 실제로 어려움을 겪고 있나요?',
          helpQuestions: [
            '어떤 어려움이 있나요?',
            '어떻게 극복하고 있나요?',
            '동기 부여 방법은?'
          ],
          ifDifficult: '솔직하게 힘든 점을 인정하세요.',
          ifStillDifficult: '작은 성공 경험을 찾아보세요.'
        },
        placeholder: '예: 계획 없이 행동하는 것이 처음에는 매우 불안했지만, 작은 성공을 경험하며 점차 편해지고 있습니다.',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 5년 후 나의 성격은?',
        hint: '장기적 성장 비전',
        guide: {
          description: '답변 가이드: 5년 후의 이상적 모습',
          diagnosis: '즉석자가진단: 구체적으로 상상할 수 있나요?',
          helpQuestions: [
            '어떤 장점이 더 강해질까요?',
            '단점은 어떻게 변할까요?',
            '새로운 강점은?'
          ],
          ifDifficult: '이상적인 멘토나 리더의 모습을 떠올려보세요.',
          ifStillDifficult: '1년 후부터 단계적으로 상상해보세요.'
        },
        placeholder: '예: 5년 후에는 체계성과 창의성을 모두 갖춘, 팀을 이끌 수 있는 리더가 되어 있을 것입니다.',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 조직 문화에 기여할 수 있는 부분은?',
        hint: '팀 시너지 창출',
        guide: {
          description: '답변 가이드: 조직에 대한 긍정적 기여',
          diagnosis: '즉석자가진단: 구체적인 기여 방법이 있나요?',
          helpQuestions: [
            '분위기 개선에 어떻게 기여할까요?',
            '업무 효율은?',
            '팀워크 향상은?'
          ],
          ifDifficult: '본인의 장점이 팀에 주는 도움을 생각해보세요.',
          ifStillDifficult: '과거 팀 활동에서 기여한 점을 떠올려보세요.'
        },
        placeholder: '예: 체계적인 일정 관리로 팀원들이 각자의 업무에 집중할 수 있는 환경을 만들겠습니다.',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 핵심 성격에서 장점 발현으로',
      hint: 'STEP 1의 핵심 특성이 STEP 2의 구체적 행동으로 어떻게 연결되나요?',
      placeholder: '예: 앞서 파악한 계획적이고 체계적인 성격은 일상과 학업에서 다음과 같이 구체적으로 나타납니다...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_2', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 장점 발현에서 실제 성과로',
      hint: 'STEP 2의 행동 패턴이 STEP 3의 구체적 성과로 어떻게 이어졌나요?',
      placeholder: '예: 이러한 체계적인 접근 덕분에 여러 프로젝트에서 의미 있는 성과를 만들 수 있었습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_3_1']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 장점에서 단점으로의 자연스러운 전환',
      hint: 'STEP 3의 장점이 STEP 4의 단점으로 어떻게 연결되나요?',
      placeholder: '예: 하지만 이러한 장점도 때로는 단점이 되기도 합니다. 계획에 대한 과도한 집착은...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 단점 인정에서 극복 노력으로의 논리적 발전',
      hint: 'STEP 4의 단점 인정이 STEP 5의 개선 노력으로 어떻게 이어지나요?',
      placeholder: '예: 이러한 한계를 인식한 후, 적극적으로 개선하기 위해 노력하고 있습니다...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_3', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 개별 특성에서 통합된 자아상으로의 논리적 연결',
      hint: 'STEP 5의 개선 노력이 STEP 6의 균형잡힌 인재상으로 어떻게 완성되나요?',
      placeholder: '예: 이런 노력을 통해 저는 체계성과 유연성의 균형을 갖춘 인재로 성장하고 있습니다...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_6_1']
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
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
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('evaluation');
      }
    } else if (currentPhase === 'evaluation') {
      const sortedSteps = [...selectedSteps].sort((a, b) => a - b);
      setSelectedSteps(sortedSteps);
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setFinalText(generatePersonalityText());
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round1' && currentStep === 0) {
      setShowIntro(true);
    }
  };

  const generatePersonalityText = () => {
    const parts = [];
    
    if (answers.q1_1_2) parts.push(answers.q1_1_2);
    if (answers.q1_1_3) parts.push('\n' + answers.q1_1_3);
    if (answers.connect_1_2) parts.push('\n' + answers.connect_1_2);
    if (answers.q1_2_1) parts.push('\n' + answers.q1_2_1);
    if (answers.q1_2_2) parts.push(answers.q1_2_2);
    if (answers.connect_2_3) parts.push('\n' + answers.connect_2_3);
    if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
    if (answers.q1_3_2) parts.push(answers.q1_3_2);
    if (answers.connect_3_4) parts.push('\n' + answers.connect_3_4);
    if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
    if (answers.q1_4_2) parts.push(answers.q1_4_2);
    if (answers.connect_4_5) parts.push('\n' + answers.connect_4_5);
    if (answers.q1_5_1) parts.push('\n' + answers.q1_5_1);
    if (answers.q1_5_2) parts.push(answers.q1_5_2);
    if (answers.connect_5_6) parts.push('\n' + answers.connect_5_6);
    if (answers.q1_6_1) parts.push('\n' + answers.q1_6_1);
    if (answers.q1_6_2) parts.push(answers.q1_6_2);
    
    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>성격의 장단점</title>
<style>
body { font-family: '맑은 고딕', 'Malgun Gothic', sans-serif; line-height: 1.8; padding: 40px; }
p { margin-bottom: 1em; }
</style>
</head>
<body>
${finalText.split('\n\n').map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_성격의_장단점.doc`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () => {
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n\n[STEP 1: 핵심 성격 파악]\nQ1.1.1: ${answers.q1_1_1 || '-'}\nQ1.1.2: ${answers.q1_1_2 || '-'}\nQ1.1.3: ${answers.q1_1_3 || '-'}\n\n[STEP 2: 장점의 발현]\nQ1.2.1: ${answers.q1_2_1 || '-'}\nQ1.2.2: ${answers.q1_2_2 || '-'}\nQ1.2.3: ${answers.q1_2_3 || '-'}\n\n[STEP 3: 성과와 기여]\nQ1.3.1: ${answers.q1_3_1 || '-'}\nQ1.3.2: ${answers.q1_3_2 || '-'}\nQ1.3.3: ${answers.q1_3_3 || '-'}\n\n[STEP 4: 단점 인정]\nQ1.4.1: ${answers.q1_4_1 || '-'}\nQ1.4.2: ${answers.q1_4_2 || '-'}\nQ1.4.3: ${answers.q1_4_3 || '-'}\n\n[STEP 5: 개선 노력]\nQ1.5.1: ${answers.q1_5_1 || '-'}\nQ1.5.2: ${answers.q1_5_2 || '-'}\nQ1.5.3: ${answers.q1_5_3 || '-'}\n\n[STEP 6: 통합된 자아상]\nQ1.6.1: ${answers.q1_6_1 || '-'}\nQ1.6.2: ${answers.q1_6_2 || '-'}\nQ1.6.3: ${answers.q1_6_3 || '-'}\n\n[3라운드 연결]\n1→2: ${answers.connect_1_2 || '-'}\n2→3: ${answers.connect_2_3 || '-'}\n3→4: ${answers.connect_3_4 || '-'}\n4→5: ${answers.connect_4_5 || '-'}\n5→6: ${answers.connect_5_6 || '-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') {
      return selectedSteps.length >= 1;
    }
    if (currentStep === 0 && currentPhase === 'round1') {
      return basicInfo.industry && basicInfo.position && basicInfo.company;
    }
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">비공개 페이지</h1>
            <p className="text-gray-600">CareerEngineer의 성격의 장단점 작성 워크북</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호를 입력하세요</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="비밀번호 입력"
                autoFocus
              />
            </div>
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                비밀번호가 올바르지 않습니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              접속하기
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              질문에 답하며 완성하는<br />성격의 장단점 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">CareerEngineer의 3라운드 체계적 작성 시스템</p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3라운드 작성 시스템</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 기본 성격의 장단점 수립</h3>
                  <p className="text-sm text-gray-700">6개 STEP 핵심 질문에 답변 (전체 구조 파악)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 STEP 선택 → 심화 질문으로 구체화 (1개 이상)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">STEP 간 연결 질문으로 자연스러운 흐름 만들기</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만</li>
                <li><strong>구체성:</strong> 숫자와 사실로 표현</li>
                <li><strong>검증 가능성:</strong> 가족도 인정할 사실만</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 3초 자가진단이란?</p>
                <p className="text-sm text-gray-700">
                  누군가 "정말이에요?"라고 물었을 때 <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong> 확인하는 것입니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 작성한 내용을 보관하세요
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2025 CareerEngineer All Rights Reserved.
                </p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                  이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
                </p>
              </div>
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
                disabled={!canGoNext()}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
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
                    <strong>내용 수정 후 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
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
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_성격의_장단점.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
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

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-800 text-center">
                © 2025 CareerEngineer All Rights Reserved.
              </p>
              <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CareerEngineer 성격의 장단점 작성 워크북
          </h1>
          <p className="text-gray-600">
            체계적인 3라운드 시스템으로 완성하는 성격의 장단점
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
                  placeholder="예: IT, 금융, 제조, 유통 등"
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
                  placeholder="예: 마케팅, 개발, 기획, 영업 등"
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
                  placeholder="예: 삼성전자, 네이버, 카카오 등"
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

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalityWorkbook;