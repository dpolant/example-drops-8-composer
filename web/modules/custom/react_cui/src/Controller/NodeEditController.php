<?php

namespace Drupal\react_cui\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;

/**
 * Class NodeEditController.
 */
class NodeEditController extends ControllerBase {

  /**
   * Hello.
   *
   * @return string
   *   Return Hello string.
   */
  public function render(Node $node) {

    $build['#attached']['library'][] = 'react_cui/app';
    $build['#attached']['drupalSettings']['reactCui']['nid'] = $node->id();
    $build['#markup'] = '<div id="root"></div>';

    return $build;
  }

}
