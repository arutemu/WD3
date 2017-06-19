<?php
/**
 * Created by PhpStorm.
 * User: Artem
 * Date: 03.06.2017
 * Time: 21:03
 */

if (isset($_POST["file_data"]))
{
    $file_path = getenv("SCRIPT_FILENAME");
    $file_path = substr($file_path, 0, strlen($file_path) - 7 - 8) . 'data.xml';

    unlink($file_path);
    file_put_contents($file_path, $_POST["file_data"]);
}
