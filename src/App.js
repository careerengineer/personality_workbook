import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, HelpCircle, Eye, Edit3 } from 'lucide-react';

const PersonalityWorkbook = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [basicInfo, setBasicInfo] = useState({ position: '', company: '' });
  const [answers, setAnswers] = useState({});

  // ── 1라운드: Q1(장점 7문항) + Q2(단점 4문항) ──────────
  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 직무와 회사를 입력하세요' },
    {
      id: 1,
      title: 'Q1: 장점',
      subtitle: '무엇이고, 어떤 계기로 형성됐으며, 왜 발전시키려 하고, 지속적으로 어떻게 나타나며, 어떤 성과를 냈고, 어떻게 기여하는가',
      questions: [
        {
          id: 'q1_1',
          label: 'Q1-1. 나의 장점은 무엇인가?',
          hint: '타인도 인정하는 장점 — 실제로 들어본 평가를 근거로',
          guide: {
            description: '실제로 들어본 평가를 근거로 작성하세요.',
            diagnosis: '즉석자가진단: "누가, 언제 그렇게 말했나요?"에 즉답 가능한가?',
            helpQuestions: [
              '가족, 친구, 선후배가 자주 하는 말은?',
              '팀에서 자연스럽게 맡게 되는 역할은?',
              '나에게 자주 부탁하는 일의 공통점은?'
            ],
            ifDifficult: '지금 당장 가장 친한 친구 1명에게 "내 첫인상이 어때?"라고 물어보세요.',
            ifStillDifficult: '평가가 여러 개 나왔다면 가장 많이 들은 것 하나를 선택하세요. "성실합니다", "열정적입니다"는 답이 아닙니다. 행동으로 관찰 가능한 특성으로 표현하세요.',
            warning: '"성실합니다", "열정적입니다"는 답이 아닙니다. 행동으로 관찰 가능한 특성으로 표현하세요.'
          },
          placeholder: '예: "계획적이고 체계적이다"\n— 팀 프로젝트에서 항상 일정 관리를 자연스럽게 맡게 됩니다.\n— 교수님: "항상 준비가 잘 되어 있다"\n— 팀원들: "같이 하면 마감 걱정이 없다"\n→ 서로 전혀 다른 사람들이 같은 표현을 씁니다.',
          rows: 4
        },
        {
          id: 'q1_2',
          label: 'Q1-2. 이 장점은 어떤 계기로 형성되었는가?',
          hint: '언제, 어떤 경험을 통해 이 성격이 만들어졌는지 — 구체적인 장면이 있어야 합니다',
          guide: {
            description: '이 장점이 처음 만들어지거나 강화된 경험을 구체적으로 작성하세요.',
            diagnosis: '즉석자가진단: "그때 무슨 일이 있었나요?"에 구체적으로 답변 가능한가?',
            helpQuestions: [
              '언제부터 이런 성격이 되었나요?',
              '이 장점이 처음으로 빛을 발한 경험은?',
              '이 장점이 없었다면 실패했을 것 같은 경험은?'
            ],
            ifDifficult: '이 장점 덕분에 처음으로 칭찬받거나 좋은 결과를 낸 순간을 떠올려보세요.',
            ifStillDifficult: '언제부터인지 몰라도 됩니다. 가장 선명한 기억 하나만 쓰세요.',
            warning: '"원래 이런 성격이었습니다"는 답이 아닙니다. 만들어진 경험이 반드시 있습니다.'
          },
          placeholder: '예: 고등학교 때 수능 준비와 동아리 활동을 동시에 하면서 처음으로 시간표를 직접 짰습니다.\n막연하게 "열심히 해야지"로 임했을 때는 둘 다 흔들렸는데,\n우선순위를 정하고 주간 일정을 관리하기 시작하자 두 가지 모두 좋은 성과가 났습니다.',
          rows: 4
        },
        {
          id: 'q1_3',
          label: 'Q1-3. 이 장점을 계속 발전시켜야겠다고 생각하게 된 계기는?',
          hint: '형성에서 그친 것이 아니라 — 이 장점이 실제로 중요하다고 느꼈던 구체적 경험',
          guide: {
            description: '이 장점 덕분에 일이 잘 풀렸거나, 타인에게 인정받거나, 없었다면 힘들었을 경험을 작성하세요.',
            diagnosis: '즉석자가진단: "그 경험이 없었다면 이 장점을 계속 키우려 했을까요?"에 답변 가능한가?',
            helpQuestions: [
              '이 장점 덕분에 위기를 넘긴 경험은?',
              '이 장점이 없었던 사람과 비교해서 차이를 느낀 순간은?',
              '"덕분에 편했다", "없었으면 어쩔 뻔했어"라는 말을 들은 순간은?',
              '이 장점을 잃어버린다면 가장 아쉬운 상황은?'
            ],
            ifDifficult: '"이 장점이 없었다면 어떻게 됐을까?"를 떠올려보세요. 그 차이가 발전 의지의 이유입니다.',
            ifStillDifficult: '이 장점으로 가장 뿌듯했던 순간, 또는 가장 고마웠다는 말을 들은 순간을 떠올려보세요.',
            warning: '"잘하는 것 같아서 계속 발전시키고 싶었습니다"는 답이 아닙니다. 구체적 경험이 이유여야 합니다.'
          },
          placeholder: '예: 동아리 프로젝트에서 제가 일정 관리를 맡은 팀은 항상 기한 내에 완성됐는데,\n제가 빠진 다른 팀은 마감 전날 밤새 작업하는 일이 반복됐습니다.\n그 차이를 직접 보면서 "이 능력이 팀 전체에 영향을 미친다"는 것을 실감했고,\n단순히 내 습관이 아닌 팀에 기여하는 역량으로 키워야겠다고 생각하게 됐습니다.',
          rows: 4
        },
        {
          id: 'q1_4',
          label: 'Q1-4. 이 장점이 지속적으로 나타난다는 것을 어떻게 증명할 수 있는가?',
          hint: '하나의 사례로는 부족합니다 — 다른 맥락, 다른 사람, 다른 시점에서 반복되는 패턴이 증거입니다',
          guide: {
            description: '"지속적"이라는 말은 증명이 필요합니다. 아래 3가지 방법으로 패턴을 보여주세요.',
            diagnosis: '즉석자가진단: 3가지 방법 중 2가지 이상을 채울 수 있는가?',
            helpQuestions: [
              '[방법 1] 다른 맥락에서 반복: 학교·알바·동아리에서도 같은 장점이 나타난 상황 3가지는?',
              '[방법 2] 다른 사람들이 같은 말을 한다: 서로 다른 관계의 2명 이상이 비슷하게 한 말은?',
              '[방법 3] 시간적 일관성: 가장 오래된 사례는? 가장 최근 사례는? 그 사이 몇 년인가요?'
            ],
            ifDifficult: '방법 1부터 시작하세요. 맥락만 달라도 충분합니다.',
            ifStillDifficult: '하나의 대표 사례만으로는 지속성을 증명할 수 없습니다. 소소한 일상 사례도 포함해서 패턴을 찾아보세요.'
          },
          placeholder: '예:\n[방법 1 — 다른 맥락에서 반복]\n학업: 매 학기 초 전과목 일정표 작성 / 팀 활동: 모든 팀 프로젝트 일정 관리 담당 / 일상: 약속·여행 캘린더 역산 입력\n\n[방법 2 — 다른 사람들이 같은 말]\n교수님: "항상 준비가 잘 돼 있다" / 팀원들: "같이 하면 마감 걱정 없다" / 친구들: "네가 있으면 굴러간다"\n\n[방법 3 — 시간적 일관성]\n고1(2019): 수행평가 일정표 직접 제작 → 대학 2학년(2022): 팀 프로젝트 간트차트 → 현재(2025): 대외활동 기획팀장',
          rows: 6
        },
        {
          id: 'q1_5',
          label: 'Q1-5. 이 장점으로 만들어낸 가장 구체적인 성과는?',
          hint: 'STAR(상황-과제-행동-결과) + 타인의 평가 — 하나를 깊게',
          guide: {
            description: 'STAR 구조로 가장 대표적인 경험 하나를 깊게 서술하세요. 타인의 평가도 함께 작성하세요.',
            diagnosis: '즉석자가진단: "그 상황을 자세히 설명해주세요"라고 하면 3분간 막힘없이 설명 가능한가?',
            helpQuestions: [
              'S(상황): 언제, 어디서, 어떤 역할이었나요?',
              'T(과제): 해결해야 했던 문제나 목표는?',
              'A(행동): 이 장점을 어떻게 발휘했나요? 구체적으로?',
              'R(결과): 숫자로 표현 가능한 결과는? (성적, 인원, 기간, 비율 등)',
              '타인 평가: 교수님, 팀장, 선배가 정확히 뭐라고 했나요?'
            ],
            ifDifficult: '큰 성과가 아니어도 됩니다. 작아도 STAR로 구체화하면 의미 있습니다.',
            ifStillDifficult: '"그때 어떤 상황이었나요?"부터 시작해 한 줄씩 채워보세요. 직접적인 말이 기억나지 않으면, 그 후 나에게 달라진 것(더 많이 부탁받는 일 등)을 써도 됩니다.'
          },
          placeholder: '예:\n[STAR 성과]\nS: 대학 축제 기획단에서 20개 부스 운영 총괄을 맡았습니다.\nT: 3주 안에 부스 섭외·물품·인력 배치를 모두 완료해야 했습니다.\nA: 부스별 준비 체크리스트를 만들고, 주 2회 책임자와 진행 상황을 점검했습니다.\nR: 당일 모든 부스가 차질 없이 운영되었고, 예산 내 처리율 100%를 달성했습니다.\n\n[타인의 평가]\n지도교수님: "너와 일하면 마음이 놓인다"\n팀원들: "덕분에 각자 역할에만 집중할 수 있었다"',
          rows: 7
        },
        {
          id: 'q1_6',
          label: 'Q1-6. 이 장점은 이 직무의 어떤 업무에서 어떻게 쓰이는가?',
          hint: '지금 채용공고를 열고 주요 업무와 장점을 1:1로 연결해보세요 — 직접 연결이 어려우면 팀 기여로 연결해도 됩니다',
          guide: {
            description: '지금 바로 채용공고를 열고 주요 업무 항목을 적은 뒤, 이 장점이 연결되는 업무에만 한 줄씩 쓰세요. 연결이 안 되는 업무는 비워두세요. 억지로 연결할 필요 없습니다.',
            diagnosis: '즉석자가진단: 연결된 업무가 1개라도 있나요? 그것으로 충분합니다.',
            helpQuestions: [
              '"이 장점이 없는 사람이 이 직무를 한다면 어떤 어려움이 생길까?"로 역으로 생각해보세요.',
              '직무 업무가 아니더라도, 이 조직·팀·문화에서 이 장점이 도움이 되는 상황은 있나요?',
              '이 장점이 없었던 시절의 나와 지금의 나는 어떻게 다른가요?',
              '이 장점 덕분에 나는 어떤 사람으로 기억되고 있나요?'
            ],
            ifDifficult: '연결이 억지스럽다면 Q1-7(기여)에서 직무 연결 대신 이 장점이 만들어내는 팀 기여를 써도 됩니다.',
            ifStillDifficult: '직접 연결이 전혀 안 된다면, "팀 내에서 누군가는 반드시 해야 하는 역할"로 연결하세요. 예: 체계적인 성격은 마케팅 크리에이티브 업무에 직접 쓰이진 않지만, 팀 일정이 흐트러질 때 중심을 잡는 사람으로 기여할 수 있습니다.'
          },
          placeholder: '예:\n[채용공고 업무 → 장점 연결]\n마케팅 캠페인 기획 → 체계적 계획 수립 능력\n일정 관리 및 진행 모니터링 → 간트차트 + 주간 체크인 습관\n복수 채널 동시 운영 → 여러 일정을 충돌 없이 관리하는 경험\n\n또는 [팀 기여로 연결 (직접 연결이 약한 경우)]\n"팀 일정이 흐트러질 때 중심을 잡는 역할로 기여할 수 있습니다."',
          rows: 5
        },
        {
          id: 'q1_7',
          label: 'Q1-7. 이 장점으로 이 직무·이 회사에 어떻게 기여하겠는가?',
          hint: '"열심히 하겠습니다"가 아닌 — 이 장점이 기여의 이유가 되어야 합니다',
          guide: {
            description: 'Q1-6에서 연결한 직무 업무를 바탕으로 기여 방식을 구체적으로 작성하세요.',
            diagnosis: '즉석자가진단: "왜 그런 기여를 할 수 있다고 생각하나요?"에 이 장점으로 즉답 가능한가?',
            helpQuestions: [
              '"이 장점이 있기 때문에 이 업무를 이렇게 할 수 있습니다"로 문장을 완성해보세요.',
              'Q1-5(STAR 성과)에서 만든 결과가 이 직무에서도 재현 가능한 이유는?',
              '"팀 프로젝트에서 ~했던 것처럼, 귀사에서도 ~하겠습니다" 구조로 시작해보세요.'
            ],
            ifDifficult: '"기여하고 싶습니다"가 아닌 "이 장점이 있기 때문에 이런 기여가 가능합니다"로 연결하세요.',
            ifStillDifficult: '입사후포부처럼 "~을 하겠습니다"로만 끝나지 않도록 주의하세요. 장점이 이유여야 합니다.',
            warning: '입사후포부처럼 "~을 하겠습니다"로만 끝나지 않도록 주의하세요. 장점이 기여의 이유여야 합니다.'
          },
          placeholder: '예: 체계적 계획성 덕분에 팀 프로젝트에서 항상 기한 내 완성이라는 결과를 만들어왔습니다.\n이 장점이 있기 때문에 귀사의 복수 캠페인 동시 운영 업무에서\n채널별 일정을 충돌 없이 관리하고, 진행 상황을 팀 전체가 공유할 수 있는 구조를 만들겠습니다.\n→ "체계적이기 때문에" → "이런 구체적 업무를" → "이렇게 할 수 있습니다"의 흐름입니다.',
          rows: 5
        }
      ]
    },
    {
      id: 2,
      title: 'Q2: 단점',
      subtitle: '무엇이고, 어떻게 알게 됐으며, 왜 고치려 하고, 어떻게 성장해 나가고 있는가',
      questions: [
        {
          id: 'q2_1',
          label: 'Q2-1. 나의 단점은 무엇인가? 이 단점을 어떻게 알게 되었는가?',
          hint: '장점의 이면이나 과도함으로 나타나는 진짜 단점 + 인식하게 된 구체적 계기',
          guide: {
            description: '[단점] 장점의 이면이나 과도함으로 나타나는 진짜 단점을 솔직하게 작성하세요.\n[인식 계기] 이 단점을 결정적으로 인식하게 된 경험을 작성하세요.',
            diagnosis: '즉석자가진단: "그래서 어떤 문제가 생겼나요?"에 구체적 사례로 즉답 가능한가?',
            helpQuestions: [
              '[단점 찾기] 이 장점이 과도하게 발현될 때 어떤 부작용이 생기나요?',
              '[단점 찾기] Q1-1의 장점을 극단적으로 밀어붙였을 때를 상상해보세요. 그게 단점입니다.',
              '[인식 계기] 단점으로 인해 실제로 어려움을 겪은 경험은?',
              '[인식 계기] "아, 이게 나의 단점이구나"라고 느낀 순간은?',
              '[인식 계기] 누구의 피드백이 결정적이었나요?'
            ],
            ifDifficult: '"이 단점 때문에 ~하지 못했다"의 형식으로 구체적 상황을 떠올려보세요.',
            ifStillDifficult: '이 단점을 개선하고 싶다고 느낀 순간을 떠올려보세요.',
            warning: '"완벽주의", "긍정적 사고", "너무 열심히 함"은 면접관에게 통하지 않습니다. 직무에 치명적이지 않은 진짜 단점을 쓰세요.'
          },
          placeholder: '예:\n[단점]\n계획적인 성격이 과도하면 유연성이 부족해집니다.\n예상치 못한 변수나 갑작스러운 계획 변경에 스트레스를 받고,\n즉흥적인 아이디어 회의나 빠른 방향 전환이 필요한 상황에서 적응이 느립니다.\n\n[인식 계기]\n스타트업 인턴십에서 매일 우선순위가 바뀌는 환경에 기존 계획을 고수하려다 팀의 속도를 따라가지 못했고,\n멘토님께서 "계획은 방향이지 족쇄가 아니다"라고 조언해주신 것이 결정적인 전환점이 되었습니다.',
          rows: 6
        },
        {
          id: 'q2_2',
          label: 'Q2-2. 이 단점을 고쳐야겠다고 결심하게 된 계기는?',
          hint: '추상적 이유가 아닌 — 실제로 어렵거나 불편했던, 또는 타인에게 불편을 끼쳤던 구체적 경험',
          guide: {
            description: '이 단점 때문에 실제로 힘들었거나, 일이 잘못됐거나, 누군가에게 불편을 준 경험을 작성하세요. 그 경험이 "이건 정말 고쳐야 하겠다"는 결심을 만든 계기입니다.',
            diagnosis: '즉석자가진단: "그때 어떤 기분이었나요?"에 구체적으로 답변 가능한가?',
            helpQuestions: [
              '[내가 힘들었던 경험] 이 단점 때문에 목표를 달성하지 못했거나 기회를 놓친 경험은?',
              '[내가 힘들었던 경험] "다시 하면 달랐을 텐데"라고 생각한 순간은?',
              '[타인에게 불편을 끼친 경험] 이 단점 때문에 팀원이나 주변 사람이 힘들어했던 적은?',
              '[타인에게 불편을 끼친 경험] 누군가가 직접적으로 불편함이나 답답함을 표현한 적은?',
              '[타인에게 불편을 끼친 경험] 내 단점 때문에 팀 전체가 영향을 받은 상황은?'
            ],
            ifDifficult: '"이 단점 때문에 ~하지 못했다" 또는 "이 단점 때문에 ~에게 미안했다"로 시작해보세요.',
            ifStillDifficult: '이 단점이 가장 크게 드러났던 하루를 떠올리고, 그날 무슨 일이 있었는지 써보세요.',
            warning: '"단점이니까 당연히 고쳐야 한다"는 계기가 아닙니다. 실제 경험에서 나온 결심이어야 합니다.'
          },
          placeholder: '예:\n[내가 힘들었던 경험]\n스타트업 인턴십에서 팀 방향이 급변했을 때, 기존 계획을 내려놓지 못해 혼자 뒤처졌습니다.\n팀은 이미 새 방향으로 달려가는데 저만 이전 계획을 수정하는 데 30분을 쓰며 멈춰있었고,\n그날 회의에서 아무 기여도 못한 채 끝났습니다. "내가 없는 게 나았겠다"는 생각이 들었습니다.\n\n[타인에게 불편을 끼친 경험]\n팀원들이 "그냥 넘어가자"며 저를 기다려줬는데,\n나중에 한 팀원이 "그때 좀 답답했어"라고 솔직하게 말해줬습니다.\n내 단점이 나만의 문제가 아니라 팀 전체에 영향을 준다는 것을 그때 처음 실감했습니다.',
          rows: 6
        },
        {
          id: 'q2_3',
          label: 'Q2-3. 지금 이 단점을 어떻게 관리하고 있는가?',
          hint: '오늘도 실행 중인 구체적 방법 — "노력 중"이 아닌 행동이 있어야 합니다',
          guide: {
            description: '오늘도 실행 중인 구체적인 관리 방법을 작성하세요.',
            diagnosis: '즉석자가진단: "오늘은 뭘 했나요?"라고 물으면 구체적 행동을 즉답할 수 있는가?',
            helpQuestions: [
              '매일/매주 반복하는 것은?',
              '이 단점이 나타나려 할 때 스스로 어떻게 하나요?',
              '새롭게 시작한 습관이나 활동은?',
              '이 전자책 작성 전에도 이 노력을 하고 있었나요?'
            ],
            ifDifficult: '작은 것이라도 괜찮습니다. "스트레스받을 때 5분 기다렸다가 말한다"도 관리입니다.',
            ifStillDifficult: '지금 당장 오늘부터 할 수 있는 가장 작은 행동 하나를 정하고 작성하세요.',
            warning: '"열심히 하겠습니다"는 관리가 아닙니다. 지금 무엇을 어떻게 하고 있는지가 핵심입니다.'
          },
          placeholder: "예: '플랜 B 습관'을 기르고 있습니다.\n모든 계획에 대안을 미리 준비해두고,\n주 1회는 계획 없이 움직이는 '즉흥 데이'를 만들어 변화에 적응하는 연습을 합니다.\n브레인스토밍 시간에는 타이머를 설정하고 평가 없이 아이디어를 먼저 내는 훈련도 꾸준히 하고 있습니다.",
          rows: 4
        },
        {
          id: 'q2_4',
          label: 'Q2-4. 아직 부족하지만, 이렇게 보완하면서 어떻게 성장해 나가고 있는가?',
          hint: '완전히 극복했다는 주장이 아닌 — 진행 중인 성장의 구체적 증거',
          guide: {
            description: '완전히 고쳤다고 주장하지 않아도 됩니다. 변화하고 있다는 증거를 작성하세요.',
            diagnosis: '즉석자가진단: "이전과 비교해 어떻게 달라졌나요?"에 구체적으로 답변 가능한가?',
            helpQuestions: [
              '이전에는 X분 걸리던 것이 지금은 Y분이다',
              '이전에는 X번 실수했던 것이 지금은 Y번이다',
              '주변에서 변화를 알아챈 사람이 있나요? 어떻게 표현했나요?',
              '이전에는 못했지만 지금은 할 수 있는 것은?'
            ],
            ifDifficult: '3개월 전 나와 오늘의 나를 같은 상황에 놓고 비교해보세요.',
            ifStillDifficult: '아주 작은 변화도 괜찮습니다. 작은 변화가 쌓여 큰 성장이 됩니다.',
            warning: '"앞으로 더 노력하겠습니다"가 아닌, 지금 변화하고 있는 과정과 방향이 드러나야 합니다.'
          },
          placeholder: '예:\n[현재까지의 변화]\n이전: 예상치 못한 변경 요청을 받으면 30분 이상 당황해서 대응이 늦었습니다.\n현재: 같은 상황에서 5분 이내에 플랜 B를 제시할 수 있게 되었습니다.\n팀장님이 "예전보다 훨씬 유연해졌다"고 말씀하셨습니다.\n\n[앞으로의 성장]\n계획성이라는 장점을 유지하면서도 빠르게 플랜 B로 전환하는 능력을 갖춰가고 있습니다.\n이 균형이 완성될수록 마케팅 직무에서 더 큰 강점이 될 것이라 생각합니다.',
          rows: 5
        }
      ]
    }
  ];

  // ── 2라운드: 심화 질문 ─────────────────────────────────
  const round2Questions = {
    1: [ // Q1 장점 심화 (5개)
      {
        id: 'q1_d1',
        label: 'Q1-심화1. 지금 당장 최근 3개월 내 타인에게 받은 피드백을 모두 적어보세요.',
        hint: '기억이 나지 않는다면 지금 바로 주변 사람에게 물어보세요 — 공통점이 핵심 장점입니다',
        guide: {
          description: '기억이 나지 않는다면 지금 당장 실행하세요.',
          diagnosis: '즉석자가진단: 3가지 이상의 평가에서 공통된 키워드가 보이나요?',
          helpQuestions: [
            '지금 바로 가장 친한 친구 1명에게 카톡으로 "내 첫인상이나 나에 대한 평가 솔직하게 말해줘"라고 보내세요.',
            '최근 함께한 팀 프로젝트 팀원에게 "같이 일하면서 어떤 점이 인상적이었어?"라고 물어보세요.',
            '나에게 자주 부탁하는 일은 무엇인가요?',
            '가장 자주 받는 칭찬과 지적은?'
          ],
          ifDifficult: '교수, 팀장, 친구 등 각각 한 명씩 떠올리고 그들의 평가를 써보세요.',
          ifStillDifficult: '공통 키워드가 바로 당신의 핵심 장점입니다.'
        },
        placeholder: '예: 교수님: "보고서가 항상 체계적이다"\n팀원들: "일정을 항상 잘 챙겨준다"\n친구들: "약속을 절대 어기지 않는다"\n알바 점장님: "시키지 않아도 미리 준비한다"\n→ 공통 키워드: "체계적, 신뢰할 수 있는, 미리 준비하는"',
        rows: 5
      },
      {
        id: 'q1_d2',
        label: 'Q1-심화2. 이 장점이 언제, 어떤 상황에서 가장 강하게 발현되나요?',
        hint: '모든 상황에서 동일하게 나타나지 않습니다 — 강하게 나타나는 상황이 본질입니다',
        guide: {
          description: '장점이 특히 강하게 나타나는 상황과 상대적으로 약해지는 상황을 비교해보세요.',
          diagnosis: '즉석자가진단: 이 장점이 가장 빛나는 순간을 생생하게 묘사할 수 있나요?',
          helpQuestions: [
            '이 장점이 없었다면 어떤 상황에서 가장 힘들었을까요?',
            '반대로 이 장점이 숨어드는 상황은?',
            '이 장점이 가장 필요한 사람은 어떤 사람인가요?'
          ],
          ifDifficult: '"이 장점이 가장 빛났던 하루"를 구체적으로 묘사해보세요.',
          ifStillDifficult: '약해지는 상황을 찾으면 단점과 자연스럽게 연결됩니다.'
        },
        placeholder: '예: 가장 강하게 발현: 여러 사람이 함께 일하는 프로젝트 상황\n→ 혼자보다 팀이 있을 때 책임감이 생기고, 체계를 만들어 팀 전체가 방향을 잃지 않도록 합니다.\n\n상대적으로 약해지는 상황: 창의적 아이디어가 필요한 자유로운 브레인스토밍\n→ 이 상황의 약점이 Q2의 단점(유연성 부족)과 직결됩니다.',
        rows: 4
      },
      {
        id: 'q1_d3',
        label: 'Q1-심화3. 이 장점을 계속 발전시켜야겠다고 생각한 계기가 막연하다면?',
        hint: '긍정적 경험·타인의 변화·"없었다면" 역으로 생각하기',
        guide: {
          description: '이 장점이 실제로 중요하다고 느꼈던 순간을 찾는 3가지 방법을 시도해보세요.',
          diagnosis: '즉석자가진단: 3가지 방법 중 하나라도 구체적인 경험이 나왔나요?',
          helpQuestions: [
            '[방법 1] 이 장점 덕분에 팀 전체가 좋은 결과를 낸 경험은?',
            '[방법 2] "덕분에 편했다", "네가 없었으면 어쩔 뻔했어"라는 말을 들은 순간은?',
            '[방법 3] 이 장점 없는 상황을 목격하고 차이를 느낀 경험은?'
          ],
          ifDifficult: '"이 장점이 없었다면 어떻게 됐을까?"를 먼저 생각한 뒤, 역으로 "그래서 계속 키워야 했다"로 연결하세요.',
          ifStillDifficult: '작은 경험도 괜찮습니다. 소소한 일상에서 이 장점이 빛났던 순간을 찾아보세요.'
        },
        placeholder: '예: [방법 2 — 타인의 반응]\n동아리 기획 프로젝트에서 팀원들이 "네가 일정 관리해줘서 우리가 각자 할 일에만 집중할 수 있었어"라고 했습니다.\n\n[방법 3 — 없는 상황을 목격]\n일정 관리 없이 진행한 다른 팀이 마감 전날 밤새 작업하는 것을 보면서,\n"이 장점이 없으면 저렇게 된다"는 것을 직접 확인했고, 더 키워야겠다는 동기가 생겼습니다.',
        rows: 5
      },
      {
        id: 'q1_d4',
        label: 'Q1-심화4. 가장 의미 있었던 성과 경험을 더 깊게 파고들어 보세요.',
        hint: '"나 없었다면 어떻게 됐을까?" — 대체 불가능한 기여의 가치',
        guide: {
          description: '본인만의 독특한 기여를 서술하세요.',
          diagnosis: '즉석자가진단: "다른 사람이었다면 같은 결과가 나왔을까요?"에 "아니오"라고 즉답할 수 있나요?',
          helpQuestions: [
            '내가 없었다면 팀은 어떻게 됐을까요?',
            '나만이 할 수 있었던 역할이나 방식은?',
            '팀원들이 나에게 고마워한 이유는?'
          ],
          ifDifficult: '실제로 그 팀원에게 "그때 내가 어떤 역할을 했던 것 같아?"라고 물어보세요.',
          ifStillDifficult: '팀에서 "이 사람이 없었으면 어떻게 됐을까?"라는 질문에 답해보세요.'
        },
        placeholder: '예: 저의 체계적 접근이 없었다면 프로젝트가 중반에 표류했을 가능성이 높습니다.\n팀원들이 각자 맡은 일만 했다면 전체 일정 충돌을 아무도 인지하지 못했을 것이고,\n마감 당일 미완성 결과물을 제출했을 수도 있었습니다.\n팀원 중 한 명이 나중에 "네가 없었으면 우리 팀 어쩔 뻔 했어"라고 했는데,\n그 말이 이 장점의 실제 가치를 가장 잘 보여준다고 생각합니다.',
        rows: 5
      },
      {
        id: 'q1_d5',
        label: 'Q1-심화5. 이 장점이 직무와 연결되는지 확인해보세요.',
        hint: '직접 연결되면 좋지만 억지스럽다면 직무 연결 부분은 건너뛰어도 됩니다',
        guide: {
          description: '지금 채용공고를 열고 주요 업무 항목을 적은 뒤, 이 장점이 연결되는 업무에만 한 줄씩 쓰세요. 연결이 안 되는 업무는 비워두세요.',
          diagnosis: '즉석자가진단: 연결된 업무가 1개라도 있나요? 그것으로 충분합니다.',
          helpQuestions: [
            '"이 장점이 없는 사람이 이 직무를 한다면 어떤 어려움이 생길까?"로 역으로 생각해보세요.',
            '직무 업무가 아니더라도, 이 팀·조직 문화에서 이 장점이 도움이 되는 상황은?',
            '이 장점이 없었던 시절의 나와 지금의 나는 어떻게 다른가요?',
            '이 장점 덕분에 나는 어떤 사람으로 기억되고 있나요?'
          ],
          ifDifficult: '연결이 억지스럽다면 Q1-7에서 직무 연결 대신 팀 기여로 써도 됩니다.',
          ifStillDifficult: '"팀 내에서 누군가는 반드시 해야 하는 역할"로 연결하세요.'
        },
        placeholder: '예:\n[직접 연결되는 경우]\n마케팅 캠페인 기획 → 체계적 계획 수립 능력으로 직접 연결됨\n복수 채널 동시 운영 → 여러 일정을 충돌 없이 관리하는 경험으로 연결됨\n\n[직접 연결이 약한 경우 — 다른 시각 확인]\n이 장점이 없었다면: 프로젝트마다 마감 전날 밤새는 상황이 반복됐을 것 같습니다.\n이 장점 덕분에 기억되는 모습: "얘랑 하면 뭔가 굴러간다"는 사람으로 기억됩니다.',
        rows: 5
      }
    ],
    2: [ // Q2 단점 심화 (6개)
      {
        id: 'q2_d1',
        label: 'Q2-심화1. 단점의 근본 원인은 무엇인가?',
        hint: '"왜 이런 단점이 생겼을까?"를 3번 반복해 물으면 진짜 원인이 나옵니다',
        guide: {
          description: '단점의 표면이 아닌 근본 원인을 파악하세요.',
          diagnosis: '즉석자가진단: 왜 그런 단점이 생겼는지 이해하고 있나요?',
          helpQuestions: [
            '이 단점이 처음 생겨난 환경이나 경험은?',
            '어떤 상황에서 이 단점이 더 강하게 나타나나요?',
            '이 단점과 내 장점은 어떻게 연결되나요?'
          ],
          ifDifficult: '"왜 이런 단점이 있을까?" → 대답 → "왜?" → 대답 → "왜?"를 3번 반복하세요.',
          ifStillDifficult: '가장 최근에 단점이 드러난 순간을 떠올리고, 그 순간 왜 그랬는지 분석해보세요.'
        },
        placeholder: '예: 완벽한 결과를 내야 한다는 책임감이 강하게 작용해, 예측 불가능한 상황을 통제하려는 경향이 생겼습니다.\n→ 이것이 장점(체계성)으로는 좋은 성과를 만들지만,\n과도해지면 변화에 저항하는 단점으로 나타납니다.\n\n이 원인을 알고 있기 때문에, 보완 방향도 명확합니다:\n"통제욕이 아닌 방향 설정"으로 계획의 역할을 재정의하는 것입니다.',
        rows: 5
      },
      {
        id: 'q2_d2',
        label: 'Q2-심화2. 보완 과정에서 가장 어려웠던 순간은? 그래도 계속하는 이유는?',
        hint: '쉽게 고쳐지지 않는다는 현실적 인정 — 그래도 계속하는 이유가 진정성입니다',
        guide: {
          description: '보완 과정이 쉽지 않았다는 것을 솔직하게 보여주세요.',
          diagnosis: '즉석자가진단: "그 순간에 어떻게 했나요?"에 구체적으로 답변 가능한가?',
          helpQuestions: [
            '보완하려 했지만 다시 원래대로 돌아간 경험은?',
            '그 순간 어떻게 다시 시도했나요?',
            '포기하고 싶었던 순간이 있었나요?'
          ],
          ifDifficult: '가장 최근에 단점이 다시 나타난 순간을 솔직하게 떠올려보세요.',
          ifStillDifficult: '어렵다고 솔직하게 말하는 것이 오히려 진정성을 높입니다.'
        },
        placeholder: '예: [가장 어려웠던 순간]\n즉흥적 회의에서 아무 말도 못하고 나온 날이 여러 번 있었습니다.\n훈련을 했는데도 그 순간이 되면 굳어버리는 자신이 답답했습니다.\n\n[그래도 계속하는 이유]\n그 순간들을 노트에 기록하고, 다음에는 어떻게 할 수 있었을지를 씁니다.\n이 과정이 느리지만 분명히 효과가 있다는 것을 조금씩 느끼기 때문에 계속하고 있습니다.',
        rows: 5
      },
      {
        id: 'q2_d3',
        label: 'Q2-심화3. 이 단점이 역으로 강점이 되는 상황은 있는가?',
        hint: '단점의 다른 면 — 균형 잡힌 자기 인식의 증거',
        guide: {
          description: '단점이 도움이 되는 상황을 솔직하게 서술하세요.',
          diagnosis: '즉석자가진단: 긍정적으로 활용할 수 있는 상황이 있나요?',
          helpQuestions: [
            '이 단점이 오히려 도움이 된 상황은?',
            '이 단점이 있어서 피할 수 있었던 실수는?',
            '이 단점을 가진 사람이 없다면 팀에 어떤 문제가 생길까요?'
          ],
          ifDifficult: '단점이 전혀 없는 사람을 상상해보세요. 그 사람에게 없는 것은 무엇인가요?',
          ifStillDifficult: '단점의 반대편을 생각해보세요.'
        },
        placeholder: '예: 계획에 집착하는 성향이 위기 상황에서는 오히려 침착한 대응으로 이어집니다.\n다른 사람들이 당황할 때 이미 대비책을 생각해둔 경우가 많아 리스크 관리에 강점을 보입니다.\n이 단점을 인식하고 관리하는 과정에서,\n"언제 계획을 지키고 언제 내려놓아야 하는가"를 스스로 판단하는 능력도 함께 기르고 있습니다.',
        rows: 4
      },
      {
        id: 'q2_d4',
        label: 'Q2-심화4. 관리 노력의 구체적 변화를 수치나 관찰 가능한 형태로 표현해보세요.',
        hint: '"더 나아졌다"는 느낌이 아닌 — 누구나 확인할 수 있는 변화',
        guide: {
          description: '측정 가능하거나 관찰 가능한 변화를 찾아보세요.',
          diagnosis: '즉석자가진단: "어떻게 달라졌는지 증명할 수 있나요?"에 답변 가능한가?',
          helpQuestions: [
            '이전에는 X분 걸리던 것이 지금은 Y분이다',
            '이전에는 X번 실수했던 것이 지금은 Y번이다',
            '주변 사람이 "많이 달라졌다"고 한 표현은?'
          ],
          ifDifficult: '3개월 전 나와 오늘의 나를 같은 상황에 놓고 비교해보세요.',
          ifStillDifficult: '아주 작은 변화도 괜찮습니다. 작은 변화가 쌓여 큰 성장이 됩니다.'
        },
        placeholder: '예: [관찰 가능한 변화]\n이전: 예상치 못한 변경 요청을 받으면 30분 이상 당황해서 대응이 늦었습니다.\n현재: 같은 상황에서 5분 이내에 플랜 B를 제시할 수 있게 되었습니다.\n\n[타인의 확인]\n팀장님이 "예전보다 훨씬 유연해졌다"고 말씀하셨고,\n최근 프로젝트에서 갑작스러운 일정 변경에도 팀에서 가장 먼저 대안을 제시했습니다.',
        rows: 5
      },
      {
        id: 'q2_d5',
        label: 'Q2-심화5. 단점을 쓰면 자기소개서에 불리한 것 아닐까요?',
        hint: '면접관이 원하는 솔직함의 기준 — 쓰면 오히려 신뢰가 높아지는 단점의 3가지 조건',
        guide: {
          description: '단점 작성에 대한 걱정이 있다면 이 기준을 먼저 확인하세요.',
          diagnosis: '즉석자가진단: 내 단점이 아래 3가지 조건을 충족하는가?',
          helpQuestions: [
            '[조건 1] 직무의 핵심 역량이 아예 없다는 뜻이 아닌 단점인가?',
            '[조건 2] 보완 중이라는 구체적 증거가 함께 있는가?',
            '[조건 3] 장점의 이면으로 연결되는 단점인가? ("이 장점이 과도해지면 이런 단점이 됩니다")'
          ],
          ifDifficult: '조건을 충족한 단점은 솔직하게 쓸수록 오히려 신뢰를 높입니다.',
          ifStillDifficult: '조건을 갖추지 못한 단점은 어떤 단점이라도 불리합니다. 조건 충족이 먼저입니다.',
          warning: '"완벽주의", "너무 열심히 함"은 면접관에게 통하지 않습니다.'
        },
        placeholder: '예: [내 단점의 조건 확인]\n① 직무 핵심 아님: 마케터인데 "유연성 부족" — 치명적이지 않음 \n② 보완 증거 있음: 플랜 B 습관, 즉흥 데이, 타이머 훈련으로 매일 관리 중 \n③ 장점의 이면: 계획성(장점)의 과도함 → 유연성 부족(단점)으로 자연스럽게 연결 \n\n→ 3가지 조건을 갖춘 단점은 쓸수록 신뢰를 높입니다.',
        rows: 5
      },
      {
        id: 'q2_d6',
        label: 'Q2-심화6. 내가 쓴 단점 서사가 진짜인지 스스로 확인해보세요.',
        hint: '글로 쓴 것과 실제 나 사이의 간극 — 3가지 시각으로 점검',
        guide: {
          description: '단점을 쓰고 나서 읽어봤을 때 "뭔가 어색하다"는 느낌이 든다면 아래 3가지로 확인해보세요.',
          diagnosis: '즉석자가진단: 3가지 확인을 모두 통과했나요?',
          helpQuestions: [
            '[확인 1] 나를 잘 아는 사람에게 이 단점 서사를 보여주고 "공감돼?"라고 물어보세요. "맞아, 그랬지"가 나오면 진짜입니다.',
            '[확인 2] 이 전자책 작성 전에도 이 보완 노력을 하고 있었나요? 글에 쓴 관리 방법이 오늘 실제로 이루어졌나요?',
            '[확인 3] 처음부터 끝까지 소리 내어 읽어보세요. "왜 갑자기 이 얘기가 나오지?"라는 느낌이 드는 문장은 앞뒤 연결을 수정하세요.'
          ],
          ifDifficult: '확인 1부터 시작하세요. 주변 사람 한 명에게 읽어달라고 부탁하는 것이 가장 빠릅니다.',
          ifStillDifficult: '확인 2가 "아니오"라면 노력 부분을 지금 실제로 하고 있는 것으로 바꾸세요.'
        },
        placeholder: '예: [확인 1 — 타인에게 확인]\n친한 친구에게 읽어줬더니 "맞아, 작년 OO 때 딱 그랬잖아"라고 했습니다.\n→ 구체적 경험을 떠올렸다는 것 자체가 진짜라는 증거입니다.\n\n[확인 3 — 흐름 점검]\n단점(과도한 계획성) → 인식(인턴십 경험) → 결심(팀에 불편을 끼쳤다) → 관리(플랜 B) → 변화(5분 내 대응)\n→ 각 단계가 자연스럽게 이어지면 완성입니다.',
        rows: 5
      }
    ]
  };

  // ── 3라운드: 연결 질문 (장점 흐름 → 단점 흐름) ─────────
  const round3Questions = [
    {
      id: 'connect_adv_core',
      label: '연결 ①→③: 장점 + 계기 + 발전 의지를 하나의 단락으로',
      hint: '"저의 장점은 [장점]입니다. [형성 계기]를 통해 만들어졌고, [발전 계기 경험]을 통해 계속 키워야겠다고 생각했습니다."',
      placeholder: '예: 고등학교 때 수능과 동아리를 병행하며 시간표를 처음 짰을 때, 계획이 있으면 된다는 확신이 생겼고 체계적인 습관이 자연스럽게 자리잡았습니다. 이후 동아리 프로젝트에서 제가 없을 때 팀이 마감 전날 밤새 작업하는 것을 보며, 이 능력이 팀 전체에 영향을 미친다는 것을 실감하고 더 키워야겠다고 생각했습니다.',
      rows: 4,
      referenceQuestions: ['q1_1', 'q1_2', 'q1_3']
    },
    {
      id: 'connect_adv_evidence',
      label: '연결 ④→⑤: 지속성 증거 + 대표 성과를 자연스럽게 연결',
      hint: '"이 성격은 [다른 맥락/다른 사람/시간적 일관성]으로 나타나고 있으며, [STAR 성과]라는 결과를 만들었고, [타인의 평가]를 받았습니다."',
      placeholder: '예: 이 성격은 학업·팀·일상 모든 곳에서 나타나고 있습니다. 교수님도, 팀원도, 친구도 같은 말을 합니다. 대학 축제 기획단에서 20개 부스를 총괄하며 예산 내 처리율 100%를 달성했고, 지도교수님께서는 "너와 일하면 마음이 놓인다"고 말씀하셨습니다.',
      rows: 4,
      referenceQuestions: ['q1_4', 'q1_5']
    },
    {
      id: 'connect_adv_contribution',
      label: '연결 ⑥→⑦: 직무 연결 + 기여를 논리적으로 연결',
      hint: '"이 장점은 귀사의 [구체적 업무]에서 직접 쓰입니다. 이 장점이 있기 때문에 [이런 방식으로] 기여할 수 있습니다."',
      placeholder: '예: 이 장점은 귀사의 복수 캠페인 동시 운영 업무에서 직접 쓰입니다. 체계적 계획성 덕분에 팀 프로젝트에서 항상 기한 내 완성이라는 결과를 만들어온 것처럼, 귀사에서도 채널별 일정을 충돌 없이 관리하고 성과 데이터를 체계적으로 정리해 다음 캠페인 개선으로 이어지는 사이클을 만들겠습니다.',
      rows: 4,
      referenceQuestions: ['q1_6', 'q1_7']
    },
    {
      id: 'connect_dis_recognition',
      label: '연결 ⑦→⑨: 단점 인식 + 고쳐야겠다는 결심을 자연스럽게 전환',
      hint: '"다만 이 장점이 과도해지면 [단점]이 나타납니다. [인식 경험]을 통해 알게 됐고, [결심 계기 경험]을 통해 반드시 고쳐야겠다고 결심했습니다."',
      placeholder: '예: 다만 이 장점이 과도해지면 유연성이 부족해집니다. 인턴십에서 팀 방향이 급변했을 때 기존 계획을 내려놓지 못해 혼자 뒤처졌고, 팀원이 나중에 "그때 좀 답답했어"라고 솔직하게 말해줬습니다. 내 단점이 나만의 문제가 아니라 팀 전체에 영향을 준다는 것을 그때 처음 실감하고, 반드시 고쳐야겠다고 결심했습니다.',
      rows: 4,
      referenceQuestions: ['q2_1', 'q2_2']
    },
    {
      id: 'connect_dis_growth',
      label: '연결 ⑩→⑪: 현재 관리 + 성장 증거로 마무리',
      hint: '"현재 [관리 방법]으로 매일 개선하고 있으며, [변화의 증거]가 있습니다. 이 과정이 [직무에서 어떤 강점]이 될 것입니다."',
      placeholder: "예: 현재 '플랜 B 습관'으로 매일 개선하고 있습니다. 3개월 전 30분 걸리던 대응이 지금은 5분 이내로 줄었고, 팀장님께서도 변화를 알아채셨습니다. 계획성과 유연성의 균형을 갖춰가는 이 과정이 귀사에서 더욱 빠르게 성장하는 기반이 될 것이라 확신합니다.",
      rows: 4,
      referenceQuestions: ['q2_3', 'q2_4']
    }
  ];

  // ── 헬퍼 함수 ──────────────────────────────────────────
  const handleAnswerChange = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));
  const handleBasicInfoChange = (field: string, value: string) => setBasicInfo(prev => ({ ...prev, [field]: value }));
  const toggleGuide = (id: string) => setShowGuide(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleStepSelection = (id: number) => setSelectedSteps(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(s => s + 1);
      } else {
        setCurrentPhase('evaluation');
      }
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(s => s + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(s => s + 1);
      } else {
        setFinalText(generateFinalText());
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'round1' && currentStep > 0) {
      setCurrentStep(s => s - 1);
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round2') {
      if (currentStep > 0) setCurrentStep(s => s - 1);
      else setCurrentPhase('evaluation');
    } else if (currentPhase === 'round3') {
      if (currentStep > 0) setCurrentStep(s => s - 1);
      else { setCurrentPhase('round2'); setCurrentStep(selectedSteps.length - 1); }
    } else if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    }
  };

  const generateFinalText = () => {
    const parts: string[] = [];
    if (answers.connect_adv_core) parts.push(answers.connect_adv_core);
    if (answers.connect_adv_evidence) parts.push('\n' + answers.connect_adv_evidence);
    if (answers.connect_adv_contribution) parts.push('\n' + answers.connect_adv_contribution);
    if (answers.connect_dis_recognition) parts.push('\n' + answers.connect_dis_recognition);
    if (answers.connect_dis_growth) parts.push('\n' + answers.connect_dis_growth);
    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>성격의 장단점</title>
<style>body{font-family:'맑은 고딕','Malgun Gothic',sans-serif;line-height:1.8;padding:40px;}p{margin-bottom:1em;}</style>
</head><body>${finalText.split('\n\n').map(p => `<p>${p.replace(/\n/g,'<br>')}</p>`).join('\n')}</body></html>`;
    const blob = new Blob([html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${basicInfo.company || '회사'}_성격의_장단점.doc`; a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true); setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () => {
    return `원본 답변 모음\n\n[기본 정보]\n직무: ${basicInfo.position||'-'}\n회사: ${basicInfo.company||'-'}\n\n` +
    `[Q1 장점]\nQ1-1 (장점): ${answers.q1_1||'-'}\nQ1-2 (형성 계기): ${answers.q1_2||'-'}\nQ1-3 (발전 결심 계기): ${answers.q1_3||'-'}\nQ1-4 (지속성 증명): ${answers.q1_4||'-'}\nQ1-5 (STAR 성과): ${answers.q1_5||'-'}\nQ1-6 (직무 연결): ${answers.q1_6||'-'}\nQ1-7 (기여): ${answers.q1_7||'-'}\n\n` +
    `[Q2 단점]\nQ2-1 (단점+인식): ${answers.q2_1||'-'}\nQ2-2 (결심 계기): ${answers.q2_2||'-'}\nQ2-3 (현재 관리): ${answers.q2_3||'-'}\nQ2-4 (성장 증거): ${answers.q2_4||'-'}\n\n` +
    `[3라운드 연결]\n①→③ 장점+계기+발전: ${answers.connect_adv_core||'-'}\n④→⑤ 지속성+성과: ${answers.connect_adv_evidence||'-'}\n⑥→⑦ 직무연결+기여: ${answers.connect_adv_contribution||'-'}\n⑦→⑨ 단점+결심: ${answers.connect_dis_recognition||'-'}\n⑩→⑪ 관리+성장: ${answers.connect_dis_growth||'-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') return selectedSteps.length >= 1;
    if (currentStep === 0 && currentPhase === 'round1') return !!(basicInfo.position && basicInfo.company);
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  // ── 로그인 화면 ──────────────────────────────────────
  // ── 소개 화면 ──────────────────────────────────────
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">질문에 답하며 완성하는<br />성격의 장단점 워크북</h1>
            <p className="text-center text-gray-600 mb-8">CareerEngineer의 3라운드 체계적 작성 시스템</p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3라운드 작성 시스템</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 장점과 단점 기본 작성</h3>
                  <p className="text-sm text-gray-700">Q1(장점 7문항)·Q2(단점 4문항)에 기본 답변 작성 — 성격 장단점의 뼈대</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 부족한 질문 심화</h3>
                  <p className="text-sm text-gray-700">답변이 얕다고 느끼는 Q를 선택 → 심화 질문으로 구체화 (1개 이상)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">장점 흐름과 단점 흐름을 연결 질문으로 하나의 서사로 완성</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만 (면접관이 "정말이에요?"라고 물을 때 즉답 가능한 것)</li>
                <li><strong>구체성:</strong> 숫자, 날짜, 고유명사로 표현</li>
                <li><strong>검증 가능성:</strong> 가족도 "맞아, 그랬지"라고 인정할 사실만</li>
                <li><strong>연결성:</strong> 장점 형성 → 발전 → 증명 → 성과 → 기여 → 단점 인식 → 결심 → 관리 → 성장이 하나의 흐름으로</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">3초 자가진단이란?</p>
                <p className="text-sm text-gray-700">누군가 "정말이에요?"라고 물었을 때 <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong> 확인하는 것입니다.</p>
              </div>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">반드시 확인</h3>
              <p className="text-sm text-red-700">작성하는 내용은 자동으로 저장되지 않으며 새로고침 시 모든 내용이 사라집니다. 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드하여 보관하세요.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">© 2026 CareerEngineer All Rights Reserved.</p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.</p>
              </div>
            </div>
            <button onClick={() => setShowIntro(false)} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg">
              1라운드 시작하기 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── 평가 화면 ──────────────────────────────────────
  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">1라운드 완료! </h2>
            <p className="text-center text-gray-600 mb-2">부족하다고 느끼는 Q를 선택하여 2라운드에서 심화 질문에 답변하세요</p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <p className="text-sm text-amber-800"><strong>선택 기준:</strong> 내 답변을 다시 읽었을 때 면접관이 "더 구체적으로 말해줄 수 있어요?"라고 물을 것 같은 Q를 선택하세요. 3초 자가진단을 통과하기 어려웠던 서브 질문이 있는 Q를 우선 선택하세요.</p>
            </div>
            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map(step => {
                const isSelected = selectedSteps.includes(step.id);
                return (
                  <div key={step.id} className={`border-2 rounded-lg p-5 transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-300'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>첫 번째 답변:</strong> {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {(answers[step.questions[0].id]?.length || 0) > 100 && '...'}
                        </div>
                      </div>
                      <button onClick={() => toggleStepSelection(step.id)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        {isSelected ? '✓ 선택됨' : '심화 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <button onClick={goToPrevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                <ChevronLeft className="w-5 h-5" />이전
              </button>
              <button onClick={goToNextStep} disabled={!canGoNext()}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg">
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>
          <div className="text-center mt-6"><p className="text-xs text-gray-500">© 2026 CareerEngineer All Rights Reserved.</p></div>
        </div>
      </div>
    );
  }

  // ── 완성 화면 ──────────────────────────────────────
  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">성격의 장단점 완성! </h2>
              <p className="text-gray-600">아래 내용을 확인하고 자유롭게 수정하세요</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-gray-700"><strong>{basicInfo.position}</strong> / <strong>{basicInfo.company}</strong></p>
            </div>

            {/* 첫 문장 가이드 */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5 mb-6">
              <h3 className="font-bold text-amber-800 mb-3">완성 전 첫 문장 확인</h3>
              <p className="text-sm text-amber-700 mb-2">첫 문장은 전체 글의 주제를 담아야 합니다. 아래 구조로 시작하세요:</p>
              <p className="text-sm text-amber-900 font-medium">[장점 + 형성 계기]로 시작 → [발전 의지 + 지속성 증거] → [성과] → [직무 기여] → [단점 인식 + 결심] → [관리 + 성장]으로 마무리</p>
              <div className="mt-3 pt-3 border-t border-amber-200">
                <p className="text-xs text-amber-700"><strong>피하세요:</strong> "저는 성격이 좋습니다" / "완벽주의가 단점입니다" / 마지막을 "더 노력하겠습니다"로 끝내는 것</p>
              </div>
            </div>

            {/* 단락별 활용 가이드 */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-6">
              <h3 className="font-bold text-purple-800 mb-3">3라운드 답변 활용 가이드</h3>
              <div className="space-y-2 text-sm text-purple-700">
                <p><strong>1단락 (장점 핵심):</strong> 연결①→③ 답변 — 장점 + 형성 계기 + 발전 의지</p>
                <p><strong>2단락 (장점 증명):</strong> 연결④→⑤ 답변 — 지속성 증거 + STAR 성과</p>
                <p><strong>3단락 (직무 기여):</strong> 연결⑥→⑦ 답변 — 직무 연결 + 기여 방식</p>
                <p><strong>4단락 (단점 전환):</strong> 연결⑦→⑨ 답변 — 단점 인식 + 결심 계기</p>
                <p><strong>5단락 (성장 마무리):</strong> 연결⑩→⑪ 답변 — 현재 관리 + 성장 증거 + 직무 연결</p>
              </div>
            </div>

            {/* 수정 전 최종 확인 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
              <h3 className="font-bold text-green-800 mb-3">수정 전 최종 확인</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p>□ 장점 → 형성 계기 → 발전 의지 → 지속성 증거 → 성과 → 직무 기여가 하나의 흐름인가?</p>
                <p>□ 단점이 장점의 이면으로 자연스럽게 연결되는가?</p>
                <p>□ 고쳐야겠다는 결심이 실제 경험(내가 힘들었거나 타인에게 불편을 끼친)에서 나오는가?</p>
                <p>□ 보완 관리가 오늘도 실행 중인 구체적 행동인가? ("노력 중"이 아닌가?)</p>
                <p>□ 마지막이 "더 노력하겠습니다"가 아닌 성장 방향과 직무 연결인가?</p>
              </div>
            </div>

            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl"></span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">반드시 다운로드하세요!</p>
                  <p className="text-sm text-red-800">페이지를 새로고침하거나 닫으면 <strong>모든 내용이 즉시 삭제</strong>됩니다. <strong>내용 수정 후 "워드 파일로 다운로드"</strong> 버튼을 눌러 저장하세요!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />완성된 성격의 장단점 (수정 가능)
                </h3>
                <button onClick={() => setShowRawAnswers(!showRawAnswers)} className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                  <Eye className="w-4 h-4" />{showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기'}
                </button>
              </div>
              <textarea value={finalText} onChange={e => setFinalText(e.target.value)} rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed" />
            </div>

            {showRawAnswers && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">원본 답변 참고</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{getRawAnswersText()}</pre>
              </div>
            )}

            <button onClick={downloadFinalText} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4">
              <Download className="w-6 h-6" />워드 파일로 다운로드 (.doc)
            </button>

            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">다운로드 완료!</p>
                <p className="text-sm text-green-700 mt-1">다운로드 폴더에서 "{basicInfo.company || '회사'}_성격의_장단점.doc" 파일을 Microsoft Word로 열어주세요.</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-4">
              <p className="text-sm text-blue-800"><strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.</p>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={goToPrevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                <ChevronLeft className="w-5 h-5" />이전으로
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <p className="text-xs text-gray-800 text-center">© 2026 CareerEngineer All Rights Reserved.</p>
            <p className="text-xs text-red-800 text-center mt-1 font-semibold">이 워크북은 저작권법에 의해 보호받는 저작물입니다. 무단 복제·배포·전송을 금합니다.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── 질문 화면 (round1 / round2 / round3) ─────────────
  const currentStepData = currentPhase === 'round1'
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`, questions: round2Questions[selectedSteps[currentStep]] }
    : { title: '3라운드: 연결 및 완성', questions: [round3Questions[currentStep]] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CareerEngineer 성격의 장단점 워크북</h1>
          <p className="text-gray-600">체계적인 3라운드 시스템으로 완성하는 성격의 장단점</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} — {currentStepData.title}</span>
              <span>전체 진행률: {Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500" style={{ width: progress + '%' }} />
            </div>
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStepData.title}</h2>
          {(currentStepData as any).subtitle && <p className="text-gray-600 mb-6">{(currentStepData as any).subtitle}</p>}

          {currentStep === 0 && currentPhase === 'round1' ? (
            <div className="space-y-4">
              {[['position','지원하고자 하는 직무','예: 마케팅, 개발, 기획, 영업 등'],
                ['company','지원하고자 하는 회사명','예: 삼성전자, 네이버, 카카오 등']
              ].map(([field, label, ph]) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                  <input type="text" value={(basicInfo as any)[field]} onChange={e => handleBasicInfoChange(field, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder={ph} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {(currentStepData.questions as any[]).map((q: any) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">{q.label}</label>
                    {q.guide && (
                      <button onClick={() => toggleGuide(q.id)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                        <HelpCircle className="w-4 h-4" />{showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'}
                      </button>
                    )}
                  </div>

                  {q.hint && <p className="text-sm text-gray-600 mb-2">{q.hint}</p>}

                  {/* round3 참조 답변 */}
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">참고: 이전 답변을 활용하세요</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId: string) => {
                          const allQ = round1Steps.flatMap(s => (s as any).questions || []);
                          const refQ = allQ.find((q: any) => q.id === refId);
                          if (!refQ || !answers[refId]) return null;
                          return (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQ.label}</p>
                              <p className="text-gray-600 italic">{answers[refId].substring(0,150)}{answers[refId].length > 150 ? '...' : ''}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 가이드 */}
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <p className="text-sm font-semibold text-blue-900">{q.guide.description}</p>
                      <p className="text-sm font-semibold text-blue-900">{q.guide.diagnosis}</p>
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq: string, i: number) => <li key={i}>• {hq}</li>)}
                          </ul>
                        </div>
                      )}
                      {q.guide.ifDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">답변하기 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>
                        </div>
                      )}
                      {q.guide.ifStillDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">그래도 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>
                        </div>
                      )}
                      {q.guide.warning && (
                        <div className="bg-red-50 border border-red-200 rounded p-2">
                          <p className="text-sm text-red-700">{q.guide.warning}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <textarea value={answers[q.id] || ''} onChange={e => handleAnswerChange(q.id, e.target.value)}
                    rows={q.rows || 3} placeholder={q.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button onClick={goToPrevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
              <ChevronLeft className="w-5 h-5" />이전
            </button>
            <button onClick={goToNextStep} disabled={!canGoNext()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold">
              다음<ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6"><p className="text-xs text-gray-500">© 2026 CareerEngineer All Rights Reserved.</p></div>
      </div>
    </div>
  );
};

export default PersonalityWorkbook;
