PGDMP  7    "                 }            social    17.2     17.2 (Ubuntu 17.2-1.pgdg24.04+1) 8    .           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            /           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            0           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            1           1262    16388    social    DATABASE     �   CREATE DATABASE social WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.utf8';
    DROP DATABASE social;
                     postgres    false            �            1259    16675    comments    TABLE     �   CREATE TABLE public.comments (
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    user_id integer,
    post_id integer,
    id integer NOT NULL
);
    DROP TABLE public.comments;
       public         heap r       postgres    false            �            1259    16681    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public               postgres    false    217            2           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public               postgres    false    218            �            1259    16682    likes    TABLE     a   CREATE TABLE public.likes (
    user_id integer,
    post_id integer,
    id integer NOT NULL
);
    DROP TABLE public.likes;
       public         heap r       postgres    false            �            1259    16685    likes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.likes_id_seq;
       public               postgres    false    219            3           0    0    likes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;
          public               postgres    false    220            �            1259    16686    posts    TABLE     �   CREATE TABLE public.posts (
    description text,
    img text,
    user_id integer,
    created_at timestamp with time zone DEFAULT now(),
    id integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.posts;
       public         heap r       postgres    false            �            1259    16693    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public               postgres    false    221            4           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public               postgres    false    222            �            1259    16694    relationships    TABLE     �   CREATE TABLE public.relationships (
    follower_user_id integer NOT NULL,
    followed_user_id integer NOT NULL,
    id integer NOT NULL
);
 !   DROP TABLE public.relationships;
       public         heap r       postgres    false            �            1259    16697    relationships_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relationships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.relationships_id_seq;
       public               postgres    false    223            5           0    0    relationships_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.relationships_id_seq OWNED BY public.relationships.id;
          public               postgres    false    224            �            1259    16698    stories    TABLE     �   CREATE TABLE public.stories (
    img character varying(200) NOT NULL,
    "userId" integer NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.stories;
       public         heap r       postgres    false            �            1259    16701    stories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.stories_id_seq;
       public               postgres    false    225            6           0    0    stories_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;
          public               postgres    false    226            �            1259    16702    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    cover_pic text,
    profile_pic text,
    city text,
    website text
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16707    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public               postgres    false    227            7           0    0    user_id_seq    SEQUENCE OWNED BY     <   ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;
          public               postgres    false    228            �            1259    16708    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false            r           2604    16768    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217            s           2604    16769    likes id    DEFAULT     d   ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);
 7   ALTER TABLE public.likes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219            u           2604    16770    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221            w           2604    16771    relationships id    DEFAULT     t   ALTER TABLE ONLY public.relationships ALTER COLUMN id SET DEFAULT nextval('public.relationships_id_seq'::regclass);
 ?   ALTER TABLE public.relationships ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223            x           2604    16772 
   stories id    DEFAULT     h   ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);
 9   ALTER TABLE public.stories ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225            y           2604    16773    users id    DEFAULT     c   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    227                      0    16675    comments 
   TABLE DATA           Q   COPY public.comments (description, created_at, user_id, post_id, id) FROM stdin;
    public               postgres    false    217   	>       !          0    16682    likes 
   TABLE DATA           5   COPY public.likes (user_id, post_id, id) FROM stdin;
    public               postgres    false    219   �>       #          0    16686    posts 
   TABLE DATA           Q   COPY public.posts (description, img, user_id, created_at, id, likes) FROM stdin;
    public               postgres    false    221   �>       %          0    16694    relationships 
   TABLE DATA           O   COPY public.relationships (follower_user_id, followed_user_id, id) FROM stdin;
    public               postgres    false    223   R?       '          0    16698    stories 
   TABLE DATA           4   COPY public.stories (img, "userId", id) FROM stdin;
    public               postgres    false    225   �?       )          0    16702    users 
   TABLE DATA           k   COPY public.users (id, username, email, password, name, cover_pic, profile_pic, city, website) FROM stdin;
    public               postgres    false    227   �?       8           0    0    comments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comments_id_seq', 9, true);
          public               postgres    false    218            9           0    0    likes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.likes_id_seq', 133, true);
          public               postgres    false    220            :           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 17, true);
          public               postgres    false    222            ;           0    0    relationships_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.relationships_id_seq', 5, true);
          public               postgres    false    224            <           0    0    stories_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.stories_id_seq', 1, false);
          public               postgres    false    226            =           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 4, true);
          public               postgres    false    228            >           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public               postgres    false    229            {           2606    16716    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public                 postgres    false    217            }           2606    16718    likes likes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public                 postgres    false    219                       2606    16720    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public                 postgres    false    221            �           2606    16722     relationships relationships_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT relationships_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.relationships DROP CONSTRAINT relationships_pkey;
       public                 postgres    false    223            �           2606    16724    stories stories_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.stories DROP CONSTRAINT stories_pkey;
       public                 postgres    false    225            �           2606    16726    users user_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public                 postgres    false    227            �           2606    16727    relationships followed_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT followed_user_id FOREIGN KEY (followed_user_id) REFERENCES public.users(id) NOT VALID;
 H   ALTER TABLE ONLY public.relationships DROP CONSTRAINT followed_user_id;
       public               postgres    false    227    4741    223            �           2606    16732    relationships follower_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT follower_user_id FOREIGN KEY (follower_user_id) REFERENCES public.users(id) NOT VALID;
 H   ALTER TABLE ONLY public.relationships DROP CONSTRAINT follower_user_id;
       public               postgres    false    223    227    4741            �           2606    16737    likes like_post_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT like_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) NOT VALID;
 <   ALTER TABLE ONLY public.likes DROP CONSTRAINT like_post_id;
       public               postgres    false    4735    219    221            �           2606    16742    likes like_user_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT like_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 <   ALTER TABLE ONLY public.likes DROP CONSTRAINT like_user_id;
       public               postgres    false    227    219    4741            �           2606    16747    comments post_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) NOT VALID;
 :   ALTER TABLE ONLY public.comments DROP CONSTRAINT post_id;
       public               postgres    false    221    4735    217            �           2606    16752    posts post_user_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 <   ALTER TABLE ONLY public.posts DROP CONSTRAINT post_user_id;
       public               postgres    false    221    227    4741            �           2606    16757    stories story_user_id    FK CONSTRAINT        ALTER TABLE ONLY public.stories
    ADD CONSTRAINT story_user_id FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;
 ?   ALTER TABLE ONLY public.stories DROP CONSTRAINT story_user_id;
       public               postgres    false    225    227    4741            �           2606    16762    comments user_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 :   ALTER TABLE ONLY public.comments DROP CONSTRAINT user_id;
       public               postgres    false    4741    217    227               �   x�}�[
�0E�gV�&�0��
����(���F��p��s97�����X�#���Tí 
G2���Ilq0-nSٮ���`0ֻB�.����'�Eܹ|���s06h#�u���P<楢ÐrNsNe�K�c�t;��$[E�:��_�&E"      !      x�3�44�4����� ;�      #   c   x���	�0г<EP"}G��Yz�&��n�o���l�b���m��(P��(��;�弙��`Զٞ�%Q��8	���Q�a�g1R'M�%�����      %   "   x�3�4�4�2�4�4�2��\@�)W� 4�w      '      x������ � �      )   �  x�u�Ko�0E��Wt�mlLH�]ʹ�@�!�IC�0��)ؐ��7e�j�h$Kw�s�w{� ����7@�J�`��2�t���ǑiO��Gf�V�P�6���i>�UH&��5}��O��r
s�ػ)-uB����6y�8u�}�S�K���q�!�[�G#h�Nj>Fȳ�:�3��_c��"L�_h��]�K.��։#2��5"	e.Ӓb��z�~?�O���7",Fޚ4z9�r���DZ�F<����?�����D%��n�r�A��z@�i�J]HAJ�@Y2��X��
�BH�T�2-a��dr�ٞư��7�f�&��?�md��P�쪒\dw�u������O�3y�\�;��ֆ*�; ���[�Xh������jz��}W�C�5�����v=ܕ|��t��2sN���z��W����C�4�/o������;رq�	�+�R>]�Wh��A��     