import type { SimpleModel } from "./types"

/**
 * 用于创建 .env.example 文件，不要直接填写敏感信息。
 * 以 CLIENT_ 开头的变量会暴露给前端
 */
export const defaultEnv = {
  CLIENT_GLOBAL_SETTINGS: {
    APIKey: "",
    password: "",
    Voice:"",
    enterToSend: true
  },
  CLIENT_SESSION_SETTINGS: {
    title: "",
    saveSession: true,
    // 0-2
    APITemperature: 0.6,
    continuousDialogue: true,
    model: "gpt-3.5" as SimpleModel
  },
  CLIENT_DEFAULT_MESSAGE: `Powered by OpenAI Vercel
- 本网站仅作为项目演示，不提供服务，请填入自己的 Key，长期使用请 [自行部署](#tips)，简单成本低。
- 点击每条消息前的头像，可以锁定对话，作为角色设定。[查看更多使用技巧](#func)。
- 现在支持多个对话，打开对话设置，点击新建对话。在输入框里输入 [[/]][[/]] 或者 [[空格]][[空格]] 可以切换对话，搜索历史消息。
- [[Shift]] + [[Enter]] 换行。开头输入 [[/]] 或者 [[空格]] 搜索 Prompt 预设。[[↑]] 可编辑最近一次提问。点击顶部名称滚动到顶部，点击输入框滚动到底部。
`,
  CLIENT_MAX_INPUT_TOKENS: {
    "gpt-3.5": 16 * 1000,
    "gpt-4": 32 * 1000
  } as Record<SimpleModel, number>,
  OPENAI_API_BASE_URL: "127.0.0.1:9000",
  OPENAI_API_KEY: "",
  AZURE_SUBSCRIPTION_KEY:"",
  AZURE_REGION:"southeastasia",
  TIMEOUT: 30000,
  PASSWORD: "",
  SEND_KEY: "",
  SEND_CHANNEL: 9,
  NO_GFW: false
}

export function getRegion(): string {
  return process.env.AZURE_REGION!
}
export function getSubKey(): string {
  return process.env.AZURE_REGION!
}

export type SessionSettings = typeof defaultEnv.CLIENT_SESSION_SETTINGS
