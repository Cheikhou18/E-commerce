<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AuthenticationController extends AbstractController
{
    #[Route('/api/signup', name: 'signup')]
    public function signup(): JsonResponse
    {
        return $this->json([
            'message' => 'Success',
        ]);
    }

    #[Route('/api/signin', name: 'signin')]
    public function signin(): JsonResponse
    {
        return $this->json([
            'message' => 'Success',
        ]);
    }
}
