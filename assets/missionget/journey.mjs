// Fixed, browser-local examples. This module never talks to the MissionGet API.
export const phases = ['idle', 'receiving', 'review', 'running', 'delivered'];
export const initialState = () => ({ phase: 'idle', scenario: null });
export function transition(state, event) {
  if (event.type === 'RESET') return initialState();
  if (event.type === 'SELECT' && Number.isInteger(event.scenario) && event.scenario >= 0 && event.scenario < 3) return { phase: 'receiving', scenario: event.scenario };
  if (event.type === 'RECOGNIZED' && state.phase === 'receiving') return { ...state, phase: 'review' };
  if (event.type === 'CONFIRM' && state.phase === 'review') return { ...state, phase: 'running' };
  if (event.type === 'COMPLETE' && state.phase === 'running') return { ...state, phase: 'delivered' };
  if (event.type === 'SKIP') return { phase: 'delivered', scenario: state.scenario ?? 0 };
  return state;
}
export const scenarios = {
  "zh": [
    {
      "utterance": "“把这场会整理成纪要，先给我草稿。”",
      "title": "整理项目讨论纪要",
      "detail": "按预置的项目讨论内容整理纪要，先给出草稿。",
      "file": "项目讨论纪要 · 示例",
      "sections": [
        [
          "这次谈了什么",
          "团队讨论下一次项目演示。重点从功能展示，调整为一个完整的办公交办过程。"
        ],
        [
          "定下来的事",
          [
            "演示只保留语音交办、会议纪要和文稿起草三个场景。",
            "每个场景都以可查看的文件收尾。",
            "涉及真实任务的改动，仍由人确认。"
          ]
        ],
        [
          "接下来",
          [
            "整理一份三分钟演示讲稿。",
            "核对手机与电脑是否能看到同一份文稿。"
          ]
        ],
        [
          "还要确认",
          "长时间会议录音与眼镜实体按键，需要继续做设备联验。"
        ]
      ],
      "kind": "document",
      "completedText": "纪要示例已整理",
      "openLabel": "查看示例纪要"
    },
    {
      "utterance": "“明天上午十点，提醒我准备项目演示材料。”",
      "title": "准备项目演示材料",
      "detail": "明天上午十点，准备项目演示材料。先核对待办内容。",
      "file": "准备项目演示材料 · 待办示例",
      "sections": [
        [
          "安排",
          "明天上午十点，准备项目演示材料"
        ],
        [
          "带上这些",
          [
            "已登录同一账号的手机与电脑。",
            "完成充电、连接检查的 AI 眼镜。",
            "一段测试会议录音和一份演示文稿。"
          ]
        ],
        [
          "演示顺序",
          [
            "用一句话交办需求。",
            "核对小觅理解的请求。",
            "在工作台打开文件。"
          ]
        ],
        [
          "提醒状态",
          "这份预置示例不会设置真实提醒。"
        ]
      ],
      "kind": "task",
      "completedText": "待办示例已整理",
      "openLabel": "查看示例待办"
    },
    {
      "utterance": "“为这个项目，起草一份三分钟演示讲稿。”",
      "title": "起草三分钟演示讲稿",
      "detail": "写一版三分钟讲稿，重点讲眼镜和工作台怎么配合。",
      "file": "三分钟演示讲稿 · 示例",
      "sections": [
        [
          "开场 · 一句话",
          "人在外面，工作能不能继续往前走？我们从一副 AI 眼镜开始试。"
        ],
        [
          "演示 · 一件事",
          "戴着眼镜交办一句话。小觅接住请求，先请人核对。确认之后，工作进入 MissionGet 工作台；回到电脑前，文件已经在同一份任务里。"
        ],
        [
          "设计 · 一个取舍",
          "少一点手机操作，保留那个该由人决定的时刻。短指令与会议录音分开，录音、转写和文件各有去处。"
        ],
        [
          "结尾 · 下一步",
          "先把一个真实工作过程接稳，再把更多动作从手机移回眼镜。"
        ]
      ],
      "kind": "document",
      "completedText": "讲稿示例已整理",
      "openLabel": "查看示例讲稿"
    }
  ],
  "en": [
    {
      "utterance": "“Turn this meeting into notes. Start with a draft.”",
      "title": "Draft the project meeting notes",
      "detail": "Use the fixed project discussion to prepare a first draft of meeting notes.",
      "file": "Project meeting notes · example",
      "sections": [
        [
          "What we discussed",
          "The next project presentation. The team shifted from listing features to showing one complete office handoff."
        ],
        [
          "Decisions",
          [
            "Keep three scenarios: a spoken request, meeting notes and a first draft.",
            "End each journey with a file people can open.",
            "Keep human confirmation before changes to real tasks."
          ]
        ],
        [
          "Next steps",
          [
            "Prepare a three-minute presentation script.",
            "Check that the same draft appears on the phone and desktop."
          ]
        ],
        [
          "Still open",
          "Long meeting recordings and the physical glasses button need further device verification."
        ]
      ],
      "kind": "document",
      "completedText": "Notes preview ready",
      "openLabel": "View sample notes"
    },
    {
      "utterance": "“Remind me to prepare the demo materials tomorrow at ten.”",
      "title": "Prepare the demo materials",
      "detail": "Tomorrow at ten, prepare the demo materials. Review the task before confirming.",
      "file": "Demo preparation · task example",
      "sections": [
        [
          "The plan",
          "Tomorrow at ten, prepare the project demo materials."
        ],
        [
          "Bring these",
          [
            "A phone and computer signed into the same account.",
            "Charged glasses with their connections checked.",
            "A sample meeting recording and a presentation draft."
          ]
        ],
        [
          "The sequence",
          [
            "Hand off a spoken request.",
            "Review what Xiao Mi understood.",
            "Open the file in the workbench."
          ]
        ],
        [
          "Reminder status",
          "This fixed example does not schedule a real reminder."
        ]
      ],
      "kind": "task",
      "completedText": "Task preview ready",
      "openLabel": "View sample task"
    },
    {
      "utterance": "“Write a first draft of a three-minute project presentation.”",
      "title": "Draft a three-minute presentation",
      "detail": "Draft a three-minute presentation about how the glasses and workbench work together.",
      "file": "Three-minute presentation · example",
      "sections": [
        [
          "Open with a question",
          "Can work keep moving when we step away from the desk? We started with a pair of AI glasses."
        ],
        [
          "Show one thing",
          "Hand off a sentence through the glasses. Xiao Mi receives it and asks for a review. After confirmation, the request enters MissionGet. The resulting file returns to the same task on the computer."
        ],
        [
          "Explain one decision",
          "Fewer taps, with a deliberate moment to decide. Short commands and meeting recordings take separate paths; audio, transcripts and files remain findable."
        ],
        [
          "Close with the next step",
          "Make one real workflow reliable before moving more actions from the phone to the glasses."
        ]
      ],
      "kind": "document",
      "completedText": "Script preview ready",
      "openLabel": "View sample script"
    }
  ]
};
