import {useEffect, useState} from "react";
import {checkWordInContext} from "../../../api/methods/word-search.methods.ts";
import {toast} from "../../../common/utils/toast.util.tsx";
import {ArticleInfo} from "../../../api/types/article.types.ts";
import getSentenceString from "../utils/get-sentence-string.ts";
import getParagraphString from "../utils/get-paragraph-string.ts";

export type SelectMode = '词' | '句' | '段';
export type Position = [number, number, number, number];

export default function useArticleState () {

  const [showSwitchModeWin, setShowSwitchModeWin] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState<SelectMode>('词');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [showWordCardWin, setShowWordCardWin] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  function handleClickOutside (event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (showSelected && !event.target.closest('#word-card-win') && !event.target.classList.contains('tab-option-button')) {
        const targetId = event.target.getAttribute('id');
        if (targetId && ( targetId.startsWith('word-') || targetId.startsWith('sentence-') )) {
          return;
        }
        unselected();
      }
      if (showSwitchModeWin && !event.target.closest('#select-mode-win') && !event.target.closest('#mode-switch-button')) {
        closeSwitchModeWin();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function reverseSwitchModeWinOpen () { setShowSwitchModeWin(prevState => !prevState); }

  function openSwitchModeWin () { setShowSwitchModeWin(true); }

  function closeSwitchModeWin () { setShowSwitchModeWin(false); }

  function changeSelectMode (mode: SelectMode) {
    setSelectMode(mode);
    unselected();
    closeSwitchModeWin();
  }

  function selected (selectedItem: string, position: Position) {
    setSelectedPosition(position);
    setSelectedItem(selectedItem);
    setShowSelected(true);
  }

  function handleWordClick (sentence: Array<string>, position: Position) {
    checkWordInContext(position[3], sentence).then(word => {
      selected(word, position);
      setShowWordCardWin(true);
    }).catch(() => {
      toast.error('不好意思，词库里没有这个词');
      selected(sentence[position[3]], position);
      setShowWordCardWin(false);
    });
  }

  function handleSentenceClick (sentence: Array<string>, position: Position) {
    selected(getSentenceString(sentence), position);
  }

  function handleParagraphClick (sentences: Array<Array<string>>, position: Position) {
    selected(getParagraphString(sentences), position);
  }

  function unselected () {
    setSelectedPosition(null);
    setSelectedItem(null);
    setShowSelected(false);
    setShowWordCardWin(false);
  }

  function checkSelected (position: Position) {
    if (selectedPosition === null) {
      return false;
    }
    if (selectMode === '词') {
      return position[0] === selectedPosition[0] && position[1] === selectedPosition[1] && position[2] === selectedPosition[2] && position[3] === selectedPosition[3];
    } else if (selectMode === '句') {
      return position[0] === selectedPosition[0] && position[1] === selectedPosition[1] && position[2] === selectedPosition[2];
    } else if (selectMode === '段') {
      return position[0] === selectedPosition[0] && position[1] === selectedPosition[1];
    } else {
      return false;
    }
  }

  function getSelectedItemId () {
    if (selectedPosition === null) {
      return '';
    }
    if (selectMode === '词') {
      return `word-${selectedPosition[0]}-${selectedPosition[1]}-${selectedPosition[2]}-${selectedPosition[3]}`;
    } else if (selectMode === '句') {
      return `sentence-${selectedPosition[0]}-${selectedPosition[1]}-${selectedPosition[2]}`;
    } else if (selectMode === '段') {
      return `paragraph-${selectedPosition[0]}-${selectedPosition[1]}`;
    } else {
      return '';
    }
  }

  function getSelectedItemContext (data: ArticleInfo) {
    if (selectedPosition === null) {
      return null;
    }
    if (selectMode === '词') {
      return getSentenceString(data.text[selectedPosition[1]][selectedPosition[2]]);
    } else if (selectMode === '句') {
      let startIndex = selectedPosition[2] - 2;
      if (startIndex < 0) startIndex = 0;
      let endIndex = selectedPosition[2] + 3;
      if (endIndex > data.text[selectedPosition[1]].length) endIndex = data.text[selectedPosition[1]].length;
      return data.text[selectedPosition[1]].slice(startIndex, endIndex).reduce(
        (curText, curWords) => {
          return curText + getSentenceString(curWords) + ' ';
        }
      , '');
    } else if (selectMode === '段') {
      let startIndex = selectedPosition[1] - 1;
      if (startIndex < 0) startIndex = 0;
      let endIndex = selectedPosition[1] + 2;
      if (endIndex > data.text.length) endIndex = data.text.length;
      return data.text.slice(startIndex, endIndex).map(sentences => getParagraphString(sentences)).join(' ');
    }
  }

  function getChatLocationState (data: ArticleInfo) {
    if (selectMode === '词') {
      return {
        objectsType: '单词',
        objects: [selectedItem],
        context: getSelectedItemContext(data)
      };
    } else if (selectMode === '句') {
      return {
        objectsType: '句子',
        objects: [selectedItem],
        context: getSelectedItemContext(data)
      };
    } else if (selectMode === '段') {
      return {
        objectsType: '段落',
        objects: [selectedItem],
        context: getSelectedItemContext(data)
      };
    }
  }

  return {
    showSwitchModeWin, selectMode, showSelected, selectedPosition, selectedItem, showWordCardWin,
    unselected, openSwitchModeWin, reverseSwitchModeWinOpen, changeSelectMode, handleWordClick, handleSentenceClick,
    checkSelected, getChatLocationState, getSelectedItemId, handleParagraphClick
  };
}