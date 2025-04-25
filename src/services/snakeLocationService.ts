
import { type SnakeData } from '@/components/identify/SnakeResult';

interface SnakesByRegionMap {
  [region: string]: SnakeData[];
}

// Database of snakes by region
// This would ideally be fetched from an API, but for demonstration purposes,
// we'll use a static map with some example data
const snakesByRegion: SnakesByRegionMap = {
  // United States
  'us': [
    {
      name: 'Eastern Diamondback Rattlesnake',
      scientificName: 'Crotalus adamanteus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Crotalus_adamanteus.jpg',
      venomType: 'Hemotoxic',
      antidote: 'CroFab (Crotalidae Polyvalent Immune Fab)',
      precautions: [
        'Seek immediate medical attention',
        'Keep the bitten area below heart level',
        'Remove jewelry or tight clothing near the bite',
        'Remain calm to slow venom spread',
        'Do not apply tourniquet or try to suck out venom'
      ],
      threatLevel: 'deadly',
      description: 'The Eastern diamondback rattlesnake is the largest venomous snake in North America. It has a distinct pattern of diamond-shaped markings along its back and a rattle on its tail that it uses as a warning signal.',
      distribution: 'Southeastern United States, particularly Florida, Georgia, Alabama, Mississippi, and parts of North and South Carolina.'
    },
    {
      name: 'Western Diamondback Rattlesnake',
      scientificName: 'Crotalus atrox',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Western_diamondback_rattlesnake.jpg',
      venomType: 'Hemotoxic',
      antidote: 'CroFab (Crotalidae Polyvalent Immune Fab)',
      precautions: [
        'Seek immediate medical attention',
        'Keep bite site immobilized and below heart level',
        'Remove constrictive items from the affected limb',
        'Note time of bite for medical professionals',
        'Do not cut the wound or attempt to suck out venom'
      ],
      threatLevel: 'deadly',
      description: 'The Western diamondback rattlesnake is a heavy-bodied snake with a distinct triangular head. It has diamond-shaped markings along its back and alternating black and white rings on its tail, just above the rattle.',
      distribution: 'Southwestern United States and northern Mexico, including Texas, New Mexico, Arizona, southern California, Oklahoma, and into Mexico.'
    },
    {
      name: 'Timber Rattlesnake',
      scientificName: 'Crotalus horridus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Timber_Rattlesnake.jpg',
      venomType: 'Hemotoxic with some neurotoxic components',
      antidote: 'CroFab (Crotalidae Polyvalent Immune Fab)',
      precautions: [
        'Get medical help immediately',
        'Remain calm and limit physical activity',
        'Position bite at or below heart level',
        'Clean wound with soap and water if medical care is delayed',
        'Take photo of snake if possible, but maintain safe distance'
      ],
      threatLevel: 'dangerous',
      description: 'The timber rattlesnake has a variable color pattern with dark brown or black crossbands on a yellowish, grayish, or brownish background. Some specimens are mostly black. They have a distinctive rattle at the end of their tails.',
      distribution: 'Eastern United States from New Hampshire and Minnesota south to Texas and Florida, though populations are fragmented and declining in many areas.'
    },
    {
      name: 'Copperhead',
      scientificName: 'Agkistrodon contortrix',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Copperhead_snake_agkistrodon_contortrix.jpg',
      venomType: 'Moderate hemotoxic',
      antidote: 'CroFab (Crotalidae Polyvalent Immune Fab), though often not needed for mild bites',
      precautions: [
        'Seek medical attention',
        'Keep bite site immobilized',
        'Clean the wound if medical care is delayed',
        'Remove jewelry and constricting items',
        'Monitor for allergic reactions or severe symptoms'
      ],
      threatLevel: 'moderate',
      description: 'Copperheads have a distinctive pattern of coppery-colored hourglass-shaped crossbands on a lighter tan or pinkish background. They have a triangular head and vertical pupils.',
      distribution: 'Eastern and Central United States from Massachusetts to Nebraska and south to Texas and Florida.'
    },
    {
      name: 'Eastern Coral Snake',
      scientificName: 'Micrurus fulvius',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Eastern_Coral_Snake_%28Micrurus_fulvius%29_%287222918220%29.jpg',
      venomType: 'Neurotoxic',
      antidote: 'North American Coral Snake Antivenin',
      precautions: [
        'Seek immediate medical attention',
        'Minimize movement to slow venom spread',
        'Do not apply tourniquet or try to suck out venom',
        'Keep bitten area below the level of the heart if possible',
        'Note time of bite to report to medical professionals'
      ],
      threatLevel: 'deadly',
      description: 'The Eastern coral snake has bright bands of red, yellow, and black, with the red and yellow bands touching. Remember the rhyme: "Red touch yellow, kill a fellow; red touch black, venom lack."',
      distribution: 'Southeastern United States, particularly in wooded, sandy and marshy areas of Florida, Alabama, Georgia, South Carolina, and parts of North Carolina.'
    },
  ],
  // India
  'in': [
    {
      name: 'Indian Cobra',
      scientificName: 'Naja naja',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Indian_Cobra.jpg',
      venomType: 'Neurotoxic with some cytotoxic effects',
      antidote: 'Polyvalent Anti-Snake Venom Serum (ASVS)',
      precautions: [
        'Seek immediate medical attention',
        'Keep patient calm and limit movement',
        'Immobilize the bitten limb with a splint',
        'Remove any rings, watches or tight clothing',
        'Do not apply tourniquet or cut the wound'
      ],
      threatLevel: 'deadly',
      description: 'The Indian cobra is a highly venomous snake with a distinctive hood that it spreads when threatened. It typically has a spectacle pattern on the back of its hood, though this may be absent in some specimens.',
      distribution: 'Throughout the Indian subcontinent, including India, Pakistan, Sri Lanka, Bangladesh, and parts of Nepal and Bhutan.'
    },
    {
      name: 'Russell\'s Viper',
      scientificName: 'Daboia russelii',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Daboia_russelii.jpg',
      venomType: 'Hemotoxic with coagulopathic effects',
      antidote: 'Polyvalent Anti-Snake Venom Serum (ASVS)',
      precautions: [
        'Seek immediate medical attention',
        'Immobilize the affected limb',
        'Keep patient calm and still',
        'Remove constrictive items from the affected limb',
        'Do not apply ice, cut the wound, or attempt to suck out venom'
      ],
      threatLevel: 'deadly',
      description: 'Russell\'s viper is a heavy-bodied snake with three rows of dark brown or black spots along its back on a yellowish or brownish background. It makes a loud hissing sound when threatened.',
      distribution: 'Throughout the Indian subcontinent, Southeast Asia, and parts of China and Taiwan.'
    },
    {
      name: 'Common Krait',
      scientificName: 'Bungarus caeruleus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Common_krait_Cropped.jpg',
      venomType: 'Strongly neurotoxic',
      antidote: 'Polyvalent Anti-Snake Venom Serum (ASVS)',
      precautions: [
        'Seek immediate medical attention',
        'Keep patient still to minimize venom spread',
        'Immobilize the bitten limb',
        'Remove constrictive items from the bitten area',
        'Monitor breathing as respiratory failure can occur'
      ],
      threatLevel: 'deadly',
      description: 'The common krait is a slender, nocturnal snake with glossy black or bluish-black body and narrow white crossbands. It has a narrow head that is slightly distinct from the neck.',
      distribution: 'Throughout the Indian subcontinent, including India, Pakistan, Sri Lanka, Bangladesh, and Nepal.'
    },
    {
      name: 'Saw-scaled Viper',
      scientificName: 'Echis carinatus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Echis_carinatus_sochureki_1.jpg',
      venomType: 'Hemotoxic with strong coagulopathic effects',
      antidote: 'Polyvalent Anti-Snake Venom Serum (ASVS)',
      precautions: [
        'Seek immediate medical attention',
        'Minimize movement to reduce venom circulation',
        'Immobilize the affected limb',
        'Remove jewelry or tight clothing near the bite',
        'Do not apply tourniquets or cut the wound'
      ],
      threatLevel: 'deadly',
      description: 'The saw-scaled viper is a small but highly venomous snake with a rough, saw-like appearance caused by serrated scales it rubs together to create a warning sound. It has a characteristic pattern of wavy, zig-zag markings along its body.',
      distribution: 'Parts of India, Pakistan, Sri Lanka, and throughout the Middle East and parts of Africa.'
    },
    {
      name: 'King Cobra',
      scientificName: 'Ophiophagus hannah',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/King-Cobra.jpg',
      venomType: 'Neurotoxic',
      antidote: 'Specific King Cobra Antivenin or Polyvalent ASVS',
      precautions: [
        'Seek immediate emergency medical care',
        'Keep victim calm and reduce physical activity',
        'Immobilize bitten limb below heart level',
        'Do not attempt first aid techniques that may cause harm',
        'Transport to hospital as quickly as possible'
      ],
      threatLevel: 'deadly',
      description: 'The king cobra is the world\'s longest venomous snake, capable of growing over 18 feet long. It has a distinctive hood, olive-green, tan, or black coloration, and can rear up to a third of its body length when threatened.',
      distribution: 'Throughout India, especially in dense forests, and across Southeast Asia including southern China, Indonesia, and the Philippines.'
    },
  ],
  // Australia
  'au': [
    {
      name: 'Eastern Brown Snake',
      scientificName: 'Pseudonaja textilis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Pseudonaja_textilis.jpg',
      venomType: 'Neurotoxic and coagulopathic',
      antidote: 'Brown Snake Antivenom',
      precautions: [
        'Apply pressure-immobilization bandage',
        'Seek immediate medical attention',
        'Keep victim still and calm',
        'Do not wash the bite area (to preserve venom for identification)',
        'Record time of bite and symptoms'
      ],
      threatLevel: 'deadly',
      description: 'The Eastern brown snake varies in color from tan to dark brown or almost black. It is slender with a small head barely distinct from the neck. They are fast-moving and highly defensive when threatened.',
      distribution: 'Eastern Australia from northern Queensland to South Australia, and parts of Papua New Guinea.'
    },
    {
      name: 'Inland Taipan',
      scientificName: 'Oxyuranus microlepidotus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Oxyuranus_microlepidotus_1.jpg',
      venomType: 'Extremely potent neurotoxic and myotoxic',
      antidote: 'Taipan Antivenom',
      precautions: [
        'Apply pressure-immobilization bandage immediately',
        'Seek urgent medical attention',
        'Keep absolutely still to slow venom spread',
        'Do not wash bite site',
        'Keep affected limb immobilized below heart level'
      ],
      threatLevel: 'deadly',
      description: 'The inland taipan is considered the world\'s most venomous snake. It has a dark tan to brownish color that darkens toward the tail, with a creamy belly. Its head is darker than the body and rounded in shape.',
      distribution: 'Arid central east Australia, particularly the Channel Country of southwestern Queensland and adjacent parts of South Australia, New South Wales, and the Northern Territory.'
    },
    {
      name: 'Tiger Snake',
      scientificName: 'Notechis scutatus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Tiger_snake_-notechis_scutatus-_Tasmania.jpg',
      venomType: 'Neurotoxic and coagulopathic',
      antidote: 'Tiger Snake Antivenom',
      precautions: [
        'Apply pressure-immobilization bandage',
        'Immobilize victim',
        'Seek immediate medical attention',
        'Do not wash the bite site',
        'Keep victim calm and reassured'
      ],
      threatLevel: 'deadly',
      description: 'Tiger snakes are highly variable in color, from yellow to black, often with distinct dark bands (like a tiger). They have a flat, broad head and can flatten their bodies when threatened.',
      distribution: 'Southern Australia, including Tasmania, southern and eastern Victoria, New South Wales, South Australia, and southwestern Western Australia.'
    },
    {
      name: 'Common Death Adder',
      scientificName: 'Acanthophis antarcticus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Acanthophis_antarcticus_-_Death_Adder.jpg',
      venomType: 'Neurotoxic',
      antidote: 'Death Adder Antivenom',
      precautions: [
        'Apply pressure-immobilization bandage',
        'Seek immediate medical attention',
        'Keep victim still',
        'Do not wash the bite site',
        'Monitor breathing as respiratory failure can occur'
      ],
      threatLevel: 'deadly',
      description: 'The death adder has a stout body, triangular head, and a thin tail ending in a spine-like tip that it uses as a lure. It varies in color from reddish to grayish-brown with darker crossbands.',
      distribution: 'Eastern and southern Australia, particularly in coastal regions and ranges from the Northern Territory to Victoria.'
    },
  ],
  // Default snakes for regions without specific data
  'default': [
    {
      name: 'Common Garter Snake',
      scientificName: 'Thamnophis sirtalis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Coast_Garter_Snake.jpg',
      venomType: 'Mild toxicity (not harmful to humans)',
      antidote: 'None needed',
      precautions: [
        'Clean bite area with soap and water',
        'Apply antiseptic if available',
        'Monitor for signs of infection'
      ],
      threatLevel: 'safe',
      description: 'The common garter snake typically has three light stripes running along its body on a darker background. The stripes may be yellow, green, blue, or white. The rest of the body is usually black, brown, gray, or olive.',
      distribution: 'Throughout North America, including Canada, United States, and Mexico. Adaptable to many environments including gardens, woodlands, fields, and wetlands.'
    },
    {
      name: 'Ball Python',
      scientificName: 'Python regius',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Ball_python_lucy.JPG',
      venomType: 'None (non-venomous constrictor)',
      antidote: 'Not applicable',
      precautions: [
        'Clean any bite with soap and water',
        'Apply antiseptic to prevent infection',
        'Seek medical attention if bite is severe'
      ],
      threatLevel: 'safe',
      description: 'The ball python is a non-venomous constrictor snake with a pattern of dark brown to black blotches on a lighter brown or tan background. It\'s named for its defensive behavior of curling into a ball with its head protected in the center.',
      distribution: 'Native to West and Central Africa but kept worldwide as a popular pet. Found in grasslands, savannas and sparsely wooded areas in its native range.'
    },
  ]
};

export async function getSnakesByLocation(country: string, state: string): Promise<SnakeData[]> {
  // In a real-world application, this would call an external API or database
  // based on the location parameters. For this demo, we'll use our static map.
  
  // Convert country code to lowercase for our map lookup
  const countryCode = country.toLowerCase();
  
  // Check if we have specific snake data for this country
  if (snakesByRegion[countryCode]) {
    return snakesByRegion[countryCode];
  }
  
  // Return default snake list if we don't have specific data for this country
  return snakesByRegion.default;
}
