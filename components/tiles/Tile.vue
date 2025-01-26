<script setup lang="ts">
const supabase = useSupabaseClient()

defineProps({
    id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: 'placeholder'
    },
    status: {
        type: Boolean,
        default: false
    },
    profileId: {
        type: String,
        default: ''
    }
})

const isUpdatedLike = ref(false);
const isUpdatedDislike = ref(false);
const isVisible = ref(true);

const likeTile = async (id: number, profile: string) => {
    try {
        const { data: record, error } = await supabase
            .from('profiles')
            .select('tiles_likes')
            .eq('user_id', profile)
            .single()

        if (record) {
            const updatedLikes = [...record.tiles_likes, id];

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ tiles_likes: updatedLikes })
                .eq('user_id', profile);

            if (updateError) {
                console.error('Error updating record:', updateError);
            } else {
                isUpdatedLike.value = true
                setTimeout(() => {
                    isVisible.value = false
                }, 750);
                console.log('Tile successfully LIKED!');
            }
        }
    }
    catch (error) {
        console.log('Catch error: ', error)
    }
}

const dislikeTile = async (id: number, profile: string) => {
    try {
        const { data: record, error } = await supabase
            .from('profiles')
            .select('tiles_dislikes')
            .eq('user_id', profile)
            .single()

        if (record) {
            const updatedDislikes = [...record.tiles_dislikes, id];

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ tiles_dislikes: updatedDislikes })
                .eq('user_id', profile);

            if (updateError) {
                console.error('Error updating record:', updateError);
            } else {
                isUpdatedDislike.value = true
                setTimeout(() => {
                    isVisible.value = false
                }, 750);
                console.log('Tile successfully DISLIKED!');
            }
        }
    }
    catch (error) {
        console.log('Catch error: ', error)
    }
}
</script>

<template>
    <article v-if="isVisible" class="tile" :class="isUpdatedLike ? 'like-clicked' : '', isUpdatedDislike ? 'dislike-clicked' : ''">
        <button class="dislike" @click="dislikeTile(id, profileId)">Dislike</button>
        <button class="like" @click="likeTile(id, profileId)">Like</button>
        <div class="inner">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <header>
                <slot />
            </header>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
        </div>
    </article>
</template>

<style scoped lang="scss">
.tile {
    position: relative;
    perspective: 500px;
    overflow: hidden;
    padding: 1rem;
    opacity: 0;
    animation: fadeIn 0.5s ease-in-out 0.25s forwards;

    > button {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50%;
        outline: 0;
        border: 0;
        padding: 0;
        width: 50%;
        border-radius: 0;
        font-size: 0;
        cursor: pointer;
        opacity: 1;
        z-index: 1;

        &.dislike {
            left: 0;

            &:hover {
                + .like + .inner {
                    transform: translate(0px, 0px) scale(1, 1) skew(0deg, 0deg) rotateX(0deg) rotateY(-11deg) rotateZ(0deg);

                    &::before {
                        opacity: .35;
                        background-size: 400%;
                    }
                }
            }
        }

        &.like {
            right: 0;

            &:hover {
                + .inner {
                    transform: translate(0px, 0px) scale(1, 1) skew(0deg, 0deg) rotateX(0deg) rotateY(11deg) rotateZ(0deg);

                    &::before {
                        opacity: .35;
                        background-position: 100% 0;
                        background-size: 200%;
                    }
                }
            }
        }
    }

    .inner {
        position: relative;
        border-radius: 99999px;
        overflow: hidden;
        background: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .25rem;
        padding: 0.75rem 1.25rem;
        
        cursor: pointer;
        font-size: 16px;
        
        box-shadow: 0 0 20px -5px black;
        transition: all .15s ease-in-out;

        &::before {
            content: '';
            position: absolute;
            inset: -10px;
            background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(0,255,12,1) 100%);
            background-repeat: no-repeat;
            background-position-x: -20px;
            background-size: 110%;
            opacity: 0.15;
            transition: all .3s ease-in-out;
        }

        header {
            font-size: 16px;
            font-weight: 600;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    &.like-clicked {
        pointer-events: none;
        
        .inner {
            animation: flashGreen 1s ease-out forwards;
        }
    }
    &.dislike-clicked {
        pointer-events: none;
        
        .inner {
            animation: flashRed 1s ease-out forwards;
        }
    }
}


@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
    100% {
        opacity: 0;
    }
}

@keyframes flashGreen {
    0% {
        box-shadow: 0 0 20px -5px green;
    }
    25% {
        box-shadow: 0 0 20px 5px green;
    }
    100% {
        opacity: 0;
    }
}

@keyframes flashRed {
    0% {
        box-shadow: 0 0 20px -5px red;
    }
    25% {
        box-shadow: 0 0 20px 5px red;
    }
    100% {
        opacity: 0;
    }
}
</style>