import React, {useId, useState} from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import references from '@site/src/components/customFunctionReferences.cjs';
import styles from './styles.module.css';

export default function CodeBlock(props) {
  const [selected, setSelected] = useState('recipe');
  const id = useId();
  const language = props.language || props.className || '';
  const names = /ya?ml/i.test(language) && typeof props.children === 'string'
    ? references.customFunctionNames(props.children) : [];
  if (!names.length) return <OriginalCodeBlock {...props} />;

  return <div data-recipe-code>
    <div role="tablist" aria-label="Recipe and custom functions" className={styles.tabs}>
      {['recipe', 'functions'].map((tab, index) => <button key={tab} type="button" role="tab"
        id={`${id}-${tab}-tab`} aria-controls={`${id}-${tab}`} aria-selected={selected === tab}
        tabIndex={selected === tab ? 0 : -1}
        onClick={() => setSelected(tab)} onKeyDown={event => {
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
            setSelected(next ? 'functions' : 'recipe');
            event.currentTarget.parentElement.children[next].focus();
          }
        }}>{tab === 'recipe' ? 'Recipe' : 'Custom functions'}</button>)}
    </div>
    <div role="tabpanel" id={`${id}-recipe`} aria-labelledby={`${id}-recipe-tab`} hidden={selected !== 'recipe'}>
      <OriginalCodeBlock {...props} />
    </div>
    <div role="tabpanel" id={`${id}-functions`} aria-labelledby={`${id}-functions-tab`} hidden={selected !== 'functions'}>
      {names.map(name => <div key={name}>
        <strong>custom.{name}</strong>
        {Object.hasOwn(references.sources, name)
          ? <OriginalCodeBlock language="python">{references.sources[name]}</OriginalCodeBlock>
          : <p>This function is not available in the shared function file.</p>}
      </div>)}
    </div>
  </div>;
}
