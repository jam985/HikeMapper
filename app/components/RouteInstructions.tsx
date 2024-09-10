'use client'

interface RouteInstructionsProps {
  instructions: {
    steps: string[];
    landmarks: string[];
  };
}

export default function RouteInstructions({ instructions }: RouteInstructionsProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Route Instructions</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-1">Steps:</h4>
          <ol className="list-decimal list-inside">
            {instructions.steps.map((step, index) => (
              <li key={index} className="mb-1">{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="font-medium mb-1">Key Landmarks:</h4>
          <ul className="list-disc list-inside">
            {instructions.landmarks.map((landmark, index) => (
              <li key={index} className="mb-1">{landmark}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
