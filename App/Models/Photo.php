<?php

declare(strict_types=1);

namespace App\Models;

class Photo implements \JsonSerializable
{

    private int $id;
    private string $filename;
    private int $contact_id;

    public function __construct()
    {
    }

    public function jsonSerialize(): mixed
    {
        $vars = get_object_vars($this);
        return $vars;    
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getFilename(): string
    {
        return $this->filename;
    }

    public function setFilename(string $filename)
    {
        $this->filename = $filename;
    }

    public function getContact_id(): int
    {
        return $this->contact_id;
    }

    public function setContact_id(int $contact_id)
    {
        $this->contact_id = $contact_id;
    }

}