function previewText(rawText, limit = 240) {
  if (!rawText) {
    return '';
  }

  const normalized = String(rawText).replace(/\s+/g, ' ').trim();
  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized;
}

function createRequestId() {
  return `recipe-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function getRunnerHint({rawText}) {
  if (typeof window === 'undefined') {
    return '';
  }

  if (rawText.includes('Cannot POST /run-recipe')) {
    return `Received HTML "Cannot POST /run-recipe" from ${window.location.origin}. This usually means the page is open on the raw Docusaurus server instead of the dev proxy. Open the site on port 3000, not 3002.`;
  }

  return '';
}

export async function readJsonResponse(response) {
  const rawText = await response.text();
  const contentType = response.headers.get('content-type') || '';

  if (!rawText) {
    return {
      payload: {},
      rawText,
      contentType,
    };
  }

  try {
    return {
      payload: JSON.parse(rawText),
      rawText,
      contentType,
    };
  } catch (_error) {
    return {
      payload: {error: rawText},
      rawText,
      contentType,
    };
  }
}

export async function runRecipeRequest({runnerUrl, recipe, input, outputColumns}) {
  const requestId = createRequestId();
  const requestBody = {
    recipe,
    input,
    outputColumns,
  };

  console.info(`[recipe-runner:${requestId}] Sending request`, {
    runnerUrl,
    origin: typeof window === 'undefined' ? 'server' : window.location.origin,
    page: typeof window === 'undefined' ? '' : window.location.pathname,
    inputColumns: input?.columns || [],
    inputRowCount: input?.rows?.length || 0,
    outputColumns: outputColumns || [],
    recipePreview: previewText(recipe, 180),
  });

  let response;
  try {
    response = await fetch(runnerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Recipe-Request-Id': requestId,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error(`[recipe-runner:${requestId}] Network failure`, {
      runnerUrl,
      message: error.message,
    });
    throw error;
  }

  const {payload, rawText, contentType} = await readJsonResponse(response);
  console.info(`[recipe-runner:${requestId}] Response received`, {
    status: response.status,
    ok: response.ok,
    contentType,
    bodyPreview: previewText(rawText),
  });

  if (!response.ok) {
    const hint = getRunnerHint({rawText});
    throw new Error(hint || payload.error || `Recipe run failed with HTTP ${response.status}.`);
  }

  return payload;
}
