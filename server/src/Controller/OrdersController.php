<?php

namespace App\Controller;

use DateTime;
use App\Entity\Orders;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class OrderController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/api/orders', name: 'create_order', methods: ['POST'])]
    public function createOrder(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);

        $order = new Orders;
        $order->setIdUser($data->id_user);
        $order->setDate(new DateTime());
        $order->setProducts($data->products);
        $order->setStatus('On Going');
        $order->setGift($data->gift);

        $this->em->persist($order);
        $this->em->flush();

        return $this->json(['success' => true, 'response' => $order->getId()]);
    }

    #[Route('/api/orders/{id}', name: 'create_order', methods: ['GET'])]
    public function getOrderById($id): JsonResponse
    {
        $order = $this->em->getRepository(Orders::class)->find($id);

        if (!$order) return $this->json(['success' => false, 'response' => 'It seems the order does not exist.']);

        return $this->json(['success' => true, 'response' => $order]);
    }

    #[Route('/api/orders/{id_user}', name: 'create_order', methods: ['GET'])]
    public function getOrderByIdUser($id_user): JsonResponse
    {
        $orders = $this->em->getRepository(Orders::class)->findByIdUser($id_user);

        return $this->json(['success' => true, 'response' => $orders]);
    }

    #[Route('/api/orders/{id}', name: 'update_order', methods: ['PATCH'])]
    public function updateOrder(Request $request, $id): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $orderExists = $this->em->getRepository(Orders::class)->find($id);

        if (!$orderExists) return $this->json(['success' => false, 'response' => 'It seems the order does not exist.']);

        $orderExists->setProducts($data->products);
        $orderExists->setStatus($data->status);

        return $this->json(['success' => true, 'response' => $orderExists]);
    }
}
