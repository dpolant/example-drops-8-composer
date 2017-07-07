<?php

$aliases['local'] = array(
  'uri' => 'danpolant-drops.dev',
  'root' => '/var/www/drupalvm/web',
  'path-aliases' => array(
    // '%drush-script' => '/var/www/drupalvm/vendor/drush',
    '%dump-dir' => '/tmp',
  ),
);

$aliases['remote.live'] = array(
  'uri' => 'live-danpolant.pantheonsite.io',
  'db-url' => 'mysql://pantheon:f20c6fd7191b458fbfe02a766b4e3ca0@dbserver.live.12eae8d4-c857-4588-bf34-470ad2053cb8.drush.in:14877/pantheon',
  'db-allows-remote' => TRUE,
  'remote-host' => 'appserver.live.12eae8d4-c857-4588-bf34-470ad2053cb8.drush.in',
  'remote-user' => 'live.12eae8d4-c857-4588-bf34-470ad2053cb8',
  'ssh-options' => '-p 2222 -o "AddressFamily inet"',
  'path-aliases' => array(
    '%files' => 'code/sites/default/files',
    '%drush-script' => 'drush',
  ),
);

$aliases['remote.test'] = array(
  'uri' => 'test-danpolant.pantheonsite.io',
  'db-url' => 'mysql://pantheon:bbd079946cd94d1ea99b34eb98ddd090@dbserver.test.12eae8d4-c857-4588-bf34-470ad2053cb8.drush.in:14878/pantheon',
  'db-allows-remote' => TRUE,
  'remote-host' => 'appserver.test.12eae8d4-c857-4588-bf34-470ad2053cb8.drush.in',
  'remote-user' => 'test.12eae8d4-c857-4588-bf34-470ad2053cb8',
  'ssh-options' => '-p 2222 -o "AddressFamily inet"',
  'path-aliases' => array(
    '%files' => 'code/sites/default/files',
    '%drush-script' => 'drush',
  ),
);

$aliases['remote.dev'] = array(
  'uri' => 'dev-danpolant.pantheonsite.io',
  'db-url' => 'mysql://pantheon:ea6cc6cc1904430086832dfed799a95f@dbserver.dev.12eae8d4-c857-4588-bf34-470ad2053cb8.drush.in:14876/pantheon',
  'db-allows-remote' => TRUE,
  'remote-host' => 'appserver.dev.12eae8d4-c857-4588-bf34-470ad2053cb8.drush.in',
  'remote-user' => 'dev.12eae8d4-c857-4588-bf34-470ad2053cb8',
  'ssh-options' => '-p 2222 -o "AddressFamily inet"',
  'path-aliases' => array(
    '%files' => 'code/sites/default/files',
    '%drush-script' => 'drush',
  ),
);
