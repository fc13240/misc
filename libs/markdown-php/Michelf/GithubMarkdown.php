<?php
namespace Michelf;

class GithubMarkdown extends \Michelf\MarkdownExtra {
	/*任务列表
	- [ ] task1
	- [x] task2
	*/
	protected function _processListItems_callback($matches) {
		$result = parent::_processListItems_callback($matches);
		$result = preg_replace_callback('{\[([ x]?)\]}',array(&$this, '_processTaskListItems_callback'), $result);
		return $result;
	}
	protected function _processTaskListItems_callback($matches){
		$isChecked = $matches[1] == 'x';
		return '<input type="checkbox"'.($isChecked?' checked':'').'/>';
	}
	protected function formParagraphs($text) {
		$result = parent::formParagraphs($text);
		$result = preg_replace_callback('{<(ul|ol)>([\s\S]+?)</\1>}',array(&$this, '_formParagraphs_callback'), $result);
		return $result;
	}

	protected function _formParagraphs_callback($matches){
		$reg = '/<li>(<input type="checkbox")/';
		if(preg_match($reg, $matches[2])){
			$result = preg_replace_callback($reg,array(&$this, '_formTaskItem_callback'), $matches[2]);
			$list_type = $matches[1];
			return "<$list_type class=\"task-list\">".$result."</$list_type>";
		}
		return $matches[0];
	}
	protected function _formTaskItem_callback($matches){
		return '<li class="task-list-item">'.$matches[1];
	}
}
?>