import React, { useState } from 'react';
import './battleModalStyle.css';
import Trainer from '../Trainer/Trainer';
import { Pokemon } from '../Pokemon/Pokemon';
import TrainerSelector from '../Trainer/TrainerSelector';
import TeamSelector from '../Trainer/TeamSelector';
import PokemonCard from '../Pokemon/PokemonCard';
import { battlePokemon } from './BattleService';

interface BattleModalProps {
    trainers: Trainer[];
}

const BattleModal: React.FC<BattleModalProps> = ({ trainers }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTrainer1, setSelectedTrainer1] = useState<Trainer | undefined>(undefined);
    const [selectedTrainer2, setSelectedTrainer2] = useState<Trainer | undefined>(undefined);
    const [selectedPokemon1, setSelectedPokemon1] = useState<Pokemon | undefined>(undefined);
    const [selectedPokemon2, setSelectedPokemon2] = useState<Pokemon | undefined>(undefined);

    const [battleResult, setBattleResult] = useState<string | null>(null);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
        setSelectedTrainer1(undefined);
        setSelectedTrainer2(undefined);
        setSelectedPokemon1(undefined);
        setSelectedPokemon2(undefined);
    };

    const handleSelectTrainer1 = (trainer: Trainer | undefined) => {
        if (selectedTrainer2 === trainer) {
            handleSelectTrainer2(undefined);
        }
        setSelectedTrainer1(trainer);
        
        handleSelectPokemon1(undefined);
        setBattleResult(null);
    }

    const handleSelectTrainer2 = (trainer: Trainer | undefined) => {
        if (selectedTrainer1 === trainer) {
            setSelectedTrainer1(undefined);
        }
        handleSelectPokemon2(undefined);
        
        setSelectedTrainer2(trainer);
        setBattleResult(null);
    }

    const handleSelectPokemon1 = (pokemon: Pokemon | undefined) => {
        setSelectedPokemon1(pokemon);
        setBattleResult(null);
    };

    const handleSelectPokemon2 = (pokemon: Pokemon | undefined) => {
        setSelectedPokemon2(pokemon);
        setBattleResult(null);
    };

    return (
        <div>
            <button onClick={handleShowModal}>Battle!</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleHideModal}>&times;</span>
                        <h2>Select Pokémon for Battle</h2>
                        <div className="app-content">
                            <div className="half-width">
                                <TrainerSelector trainers={trainers} onSelect={(trainer) => {
                                    handleSelectTrainer1(trainer);
                                }} />
                                {selectedTrainer1 && (
                                    <TeamSelector selectedTrainer={selectedTrainer1}
                                        onSelect={(pokemon) => {
                                            handleSelectPokemon1(pokemon);
                                        }}
                                    />
                                )}
                            </div>

                            <div className="half-width">
                                <TrainerSelector trainers={trainers} onSelect={(trainer) => {
                                    handleSelectTrainer2(trainer);
                                }} />
                                {selectedTrainer2 && (
                                    <TeamSelector selectedTrainer={selectedTrainer2}
                                        onSelect={(pokemon) => {
                                            handleSelectPokemon2(pokemon);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        {(selectedPokemon1 || selectedPokemon2) && (
                            <div className="battle-button-container">
                                <div className="app-content">
                                    <div className="half-width">
                                        {selectedPokemon1 && (
                                            <PokemonCard pokemon={selectedPokemon1} />
                                        )}
                                    </div>
                                    <div className="half-width">
                                        {selectedPokemon2 && (
                                            <PokemonCard pokemon={selectedPokemon2} />
                                        )}
                                    </div>
                                </div>

                                {battleResult && (
                                    <div>
                                        <h2>{battleResult}</h2>
                                    </div>
                                )}

                                {battleResult === null && selectedPokemon1 && selectedPokemon2 && (
                                    <button className="battle-button" onClick={() => {
                                        setBattleResult('Battling... Please wait!');
                                        battlePokemon(selectedPokemon1, selectedPokemon2).then((result) => {
                                            setBattleResult(result);
                                        });
                                    }}>
                                        Battle!
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BattleModal;
