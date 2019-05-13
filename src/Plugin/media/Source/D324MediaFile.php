<?php

namespace Drupal\d324_media\Plugin\media\Source;

use Drupal\entity_browser_generic_embed\FileInputExtensionMatchTrait;
use Drupal\entity_browser_generic_embed\InputMatchInterface;
use Drupal\media\Plugin\media\Source\File as DrupalCoreMediaFile;

/**
 * Input-matching version of the D324 Media File media source.
 */
class D324MediaFile extends DrupalCoreMediaFile implements InputMatchInterface {

  use FileInputExtensionMatchTrait;

}