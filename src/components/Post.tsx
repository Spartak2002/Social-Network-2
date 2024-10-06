import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BASE } from '../helpers/default';
import { IPost } from '../helpers/types';
import { Avatar, Stack } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export interface IProps {
    postId: number
    handleClose: () => void
    currentPosts: IPost
}
export function Post({ postId, handleClose, currentPosts }: IProps) {
    return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            POST no. {postId}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img
              src={BASE + currentPosts.picture}
              alt={`Post ${postId}`}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>Likes {currentPosts.likes.length}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, overflowX: 'auto' }}>
            {currentPosts.likes.map((user, id) => (
              <Box key={id} sx={{ textAlign: 'center' }}>
                <Avatar src={BASE + user.picture} alt={user.name} />
                <Typography variant="body2">{user.name}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}