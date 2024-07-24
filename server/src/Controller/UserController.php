<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Security;

class UserController extends AbstractController
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    #[Route('/user', name: 'app_user')]
    public function index(): JsonResponse
    {
        if (!$this->security->isGranted('ROLE_ADMIN')) {
            return new JsonResponse([
                'message' => 'Access denied. You do not have the required permissions.',
            ], 403);
        }

        return $this->json([
            'message' => 'Welcome to the admin section!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }


    #[Route('/api/user-info', name: 'user_info', methods: ['GET'])]
    public function userInfo(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname()
        ]);
    }
}
