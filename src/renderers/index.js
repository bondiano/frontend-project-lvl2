import renderDiff from './render-diff';

const getRenderersByFormat = {
  diff: renderDiff,
};

const getRenderer = (format) => getRenderersByFormat[format];

export default getRenderer;
