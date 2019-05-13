<?php

namespace Drupal\d324_media\Plugin\media\Source;

use Drupal\entity_browser_generic_embed\FileInputExtensionMatchTrait;
use Drupal\entity_browser_generic_embed\InputMatchInterface;
use Drupal\media\Plugin\media\Source\Image as DrupalCoreMediaImage;

/**
 * Input-matching version of the D324 Media Image media source.
 */
class D324MediaImage extends DrupalCoreMediaImage implements InputMatchInterface {

  use FileInputExtensionMatchTrait;

}