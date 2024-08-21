<?php

namespace App\Controller;

use App\Entity\Delivery;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ShippingController extends AbstractController
{
    #[Route('/api/ship', name: 'app_shipping')]
    public function ship(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);

        $initialAddress = "24 Rue Pasteur, 94270 Le Kremlin-Bicêtre";
        $deliveryAddress = "$data->address $data->zipcode $data->city";

        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" . urlencode($initialAddress) . "&destinations=" . urlencode($deliveryAddress) . "&key=AIzaSyAsjQ-lF6Pr2woKUm_8tQpKGFSazUPbUwA";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        if (!$response) return $this->json(['success' => false]);

        return $this->json([
            'success' => true,
            'response' => json_decode($response, true)
        ]);
    }

    #[Route('/api/delivery', name: 'get_deliverytypes', methods: ['GET'])]
    public function getDeliveryType(EntityManagerInterface $em): JsonResponse
    {
        $deliveryTypes = $em->getRepository(Delivery::class)->findAll();
        if (!$deliveryTypes) return $this->json(['success' => false], 404);

        $response = [];

        foreach ($deliveryTypes as $delivery) {
            $response[] = [
                'id' => $delivery->getId(),
                'delivery_type' => $delivery->getDeliveryType(),
                'price_per_km' => $delivery->getPricePerKm()
            ];
        }

        return $this->json(['success' => true, 'response' => $response], 200);
    }

    #[Route('/api/delivery', name: 'create_deliverytype', methods: ['POST'])]
    public function createDeliveryType(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), false);

        $pricePerKm = $data->pricePerKm;
        $deliveryType = $data->deliveryType;

        $deliveryTypeAlreadyExists = $em->getRepository(Delivery::class)->findByDeliveryType($deliveryType);
        if ($deliveryTypeAlreadyExists) return $this->json(['success' => false, 'response' => 'This delivery type already exists.'], 400);

        $newDelivery = new Delivery;
        $newDelivery->setPricePerKM($pricePerKm);
        $newDelivery->setDeliveryType($deliveryType);

        $em->persist($newDelivery);
        $em->flush();

        return $this->json(['success' => true, 'response' => 'Delivery type created successfully.'], 200);
    }

    #[Route('/api/delivery', name: 'update_deliverytype', methods: ['PATCH'])]
    public function updateDeliveryType(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), false);

        $pricePerKm = $data->pricePerKm;
        $deliveryType = $data->deliveryType;

        $deliveryTypeExists = $em->getRepository(Delivery::class)->findByDeliveryType($deliveryType);
        if (!$deliveryTypeExists) return $this->json(['success' => false, 'response' => 'Delivery type not found.'], 404);

        $deliveryTypeExists->setPricePerKM($pricePerKm);
        $deliveryTypeExists->setDeliveryType($deliveryType);

        $em->flush();

        return $this->json(['success' => true, 'response' => 'Delivery type updated successfully.'], 200);
    }
}
