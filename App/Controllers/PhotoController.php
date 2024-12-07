<?php

namespace App\Controllers;

header("Content-Type: application/json; charset=utf-8");
require($_SERVER["DOCUMENT_ROOT"] . DIRECTORY_SEPARATOR . "autoload.php");

use App\Database\PhotoDAO;
use App\Helpers\FileHelper;
use App\Models\Photo;

if($_SERVER["REQUEST_METHOD"] === "GET") {
    $action = filter_input(INPUT_GET, "action");
    if($action === "list") {
        $contact_id = (int)filter_input(INPUT_GET, "contact_id");
        $dao = new PhotoDAO();
        echo json_encode($dao->list($contact_id));
    }
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = filter_input(INPUT_POST, "action");
    if($action === "store") {
        $photo = new Photo();
        $contact_id = (int)filter_input(INPUT_POST, "contact_id");
        $file = $_FILES["photo"];
        if(FileHelper::hasFile($file) && FileHelper::sizeLimits($file)) {
            $mime = $file["type"];
            if(FileHelper::checkExtension($mime)) {
                $filename = FileHelper::generateFilename($mime);                
                if(move_uploaded_file($_FILES["photo"]["tmp_name"], PHOTO_UPLOADS . $filename)) {
                    $photo->setFilename($filename);
                    $photo->setContact_id($contact_id);
                    $dao = new PhotoDAO();
                    echo json_encode($dao->store($photo));
                    return;
                }
            }
        }
        echo json_encode(null);
    }
    if($action === "delete") {
        $id = (int)filter_input(INPUT_POST, "id");
        $filename = filter_input(INPUT_POST, "filename");
        $dao = new PhotoDAO();        
        if($filename !== "") {
            if($dao->delete($id)) {
                FileHelper::deleteFile(PHOTO_UPLOADS . $filename);
                echo json_encode(true);
            }
            else {
                echo json_encode(false);
            }
        }
        else {
            $photos = $dao->list($id);
            if(count($photos) > 0) {                
                foreach($photos as $photo) {
                    if($dao->delete($photo->getId())) {                
                        FileHelper::deleteFile(PHOTO_UPLOADS . $photo->getFilename());
                    }
                }                
            }
            echo json_encode(true);
        }
    }
}