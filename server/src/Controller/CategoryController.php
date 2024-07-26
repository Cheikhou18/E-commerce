<?php

namespace App\Controller;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class CategoryController extends AbstractController
{
    private EntityManagerInterface $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/categories', name: 'app_category')]
    public function getCategories(): JsonResponse
    {
        $categories = $this->em->getRepository(Category::class)->findAll();

        if (!$categories) return $this->json(['success' => false]);

        return $this->json([
            'success' => true,
            'categories' => $categories
        ]);
    }

    #[Route('/categories', name: 'app_category', methods: ['POST'])]
    public function createCategory(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $categoryExists = $this->em->getRepository(Category::class)->findByName($data->name());

        if ($categoryExists) return $this->json(['success' => false, 'message' => 'Category already exists']);

        return $this->json([
            'success' => true,
            'message' => 'Category created successfully'
        ]);
    }

    #[Route('/categories/{id}', name: 'app_category', methods: ['PUT'])]
    public function editCategory($id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $categoryExists = $this->em->getRepository(Category::class)->findById($id);

        if (!$categoryExists) return $this->json(['success' => false, 'message' => 'Category does not exist']);

        $categoryExists->setName($data->name);
        $this->em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Category updated successfully'
        ]);
    }

    #[Route('/categories/{id}', name: 'app_category', methods: ['DELETE'])]
    public function deleteCategory($id): JsonResponse
    {
        $categoryExists = $this->em->getRepository(Category::class)->findById($id);

        if (!$categoryExists) return $this->json(['success' => false, 'message' => 'Category does not exist']);

        $this->em->remove($categoryExists);
        $this->em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}
