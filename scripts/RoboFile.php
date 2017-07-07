<?php

use  JoeStewart\RoboDrupalVM\Task\Vm;

class RoboFile extends \Robo\Tasks
{

  use \Mediacurrent\CiScripts\Task\loadTasks;
  use \Mediacurrent\CiScripts\Command\Console;
  use \Mediacurrent\CiScripts\Command\Drush;
  use \Mediacurrent\CiScripts\Command\Database;
  use \Mediacurrent\CiScripts\Command\Project;
  use \Mediacurrent\CiScripts\Command\Release;
  use \Mediacurrent\CiScripts\Command\Site;
  use \Mediacurrent\CiScripts\Command\Theme;
  use \Mediacurrent\CiScripts\Command\Vagrant;

  private $vm;
  private $configuration;

  private $drupalvm_package;

  public function __construct() {

    $this->drupalvm_package = 'dpolant/drupalvm';

    $this->vm = New Vm();
    $this->configuration = $this->vm->configuration;
  }
}
