// ============================================================================
// 🛠️ AI 接口配置中心 / AI Configuration Center
// ============================================================================

const AI_CONFIG = {
  // 🟢 OpenAI 兼容接口配置 (当前使用: 智谱 AI / BigModel)
  // 基础地址: 对应 curl 中的 --url https://open.bigmodel.cn/api/paas/v4/...
  baseUrl: process.env.BASE_URL ,
  
  // API Key: 对应 curl 中的 --header 'Authorization: Bearer ...'
  apiKey: process.env.API_KEY ,
  
  // 模型名称
  model: process.env.MODEL_NAME,
};

// ============================================================================

const SYSTEM_PROMPT = `You are a professional, empathetic, and knowledgeable career counselor and employment expert named "智汇AI". 
Your audience is job seekers in China. 
Provide practical, actionable advice regarding skills training, resume writing, interview preparation, and career planning.
Keep your answers concise (under 200 words unless asked for detail), encouraging, and formatted with bullet points for readability.
Use Chinese language.`;

/**
 * 获取流式 AI 建议
 * Returns an async generator that yields chunks of text.
 */
export async function* getCareerAdvice(query: string): AsyncGenerator<string, void, unknown> {
  try {
    const { baseUrl, apiKey, model } = AI_CONFIG;
    
    if (!apiKey) {
        yield "⚠️ 配置错误: 未配置 API Key。";
        return;
    }
    
    // 注意：OpenAI 兼容接口通常路径为 /chat/completions
    const endpoint = `${baseUrl}/chat/completions`;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: query }
            ],
            temperature: 0.7,
            stream: true // ✅ 开启流式传输
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('[AI Service] Error Response:', errorText);
        throw new Error(`API Request Failed (${response.status}): ${errorText}`);
    }

    if (!response.body) throw new Error("Response body is null");

    // 处理 SSE (Server-Sent Events) 流
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // 处理除最后一行外的所有行（最后一行可能不完整，留到下一次循环）
        buffer = lines.pop() || ""; 

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;
            
            if (trimmedLine.startsWith('data: ')) {
                try {
                    const jsonStr = trimmedLine.substring(6); // 去掉 "data: "
                    const json = JSON.parse(jsonStr);
                    const content = json.choices?.[0]?.delta?.content;
                    if (content) {
                        yield content;
                    }
                } catch (e) {
                    console.warn("Failed to parse SSE JSON:", e);
                }
            }
        }
    }

  } catch (error) {
    console.error("AI Service Error:", error);
    yield `\n\n[系统提示: 连接中断或发生错误 - ${error instanceof Error ? error.message : 'Unknown'}]`;
  }
}