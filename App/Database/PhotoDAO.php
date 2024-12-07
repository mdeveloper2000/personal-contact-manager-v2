<?php

declare(strict_types=1);

namespace App\Database;

use App\Models\Photo;

class PhotoDAO
{

    private \PDO $database;

    public function __construct()
    {
        $this->database = ConnectionFactory::getConnection();
    }

    public function list(int $contact_id): array
    {
        $photos = [];
        try {
            $query = "SELECT id, filename FROM photos WHERE contact_id = :contact_id";
            $statement = $this->database->prepare($query);
            $statement->bindValue(":contact_id", $contact_id);
            $statement->execute();            
            while($row = $statement->fetch(\PDO::FETCH_OBJ)) {
                $photo = new Photo();
                $photo->setId($row->id);
                $photo->setFilename($row->filename);                
                array_push($photos, $photo);
            }
        } 
        catch (\PDOException $exception) {
            $exception->getMessage();
        }
        return $photos;
    }

    public function store(Photo $photo): ?string
    {
        try {
            if(self::checkLimit($photo->getContact_id()) < 5) {
                $query = "INSERT INTO photos (filename, contact_id) VALUES (:filename, :contact_id)";
                $statement = $this->database->prepare($query);
                $statement->bindValue(":filename", $photo->getFilename());
                $statement->bindValue(":contact_id", $photo->getContact_id());                
                $statement->execute();            
                if($statement->rowCount() > 0) {
                    return $photo->getFilename();
                }
            }        
        }
        catch (\PDOException $exception) {
            $exception->getMessage();
        }
        return null;

    }

    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM photos WHERE id = :id";
            $statement = $this->database->prepare($query);
            $statement->bindValue(":id", $id);                
            $statement->execute();
            if($statement->rowCount() > 0) {
                return true;
            }        
        }
        catch (\PDOException $exception) {
            $exception->getMessage();
        }
        return false;

    }

    public function checkLimit(int $contact_id): int
    {
        try {
            $query = "SELECT contact_id FROM photos WHERE contact_id = :contact_id";
            $statement = $this->database->prepare($query);
            $statement->bindValue(":contact_id", $contact_id);
            $statement->execute();
            return $statement->rowCount();
        }
        catch (\PDOException $exception) {
            $exception->getMessage();
        }
        return 0;
    }

}